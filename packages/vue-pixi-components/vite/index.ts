import { Plugin } from "vite";
import { MagicString, parse } from "vue/compiler-sfc";

export function vuePixi(): Plugin {
  return {
    name: "pixi-plugin",
    async transform(code, id) {
      if (!id.endsWith(".vue")) return;

      const s = new MagicString(code);

      const searchString = "texture=";

      let index = code.indexOf(searchString);

      const importedTextures = new Map<string, string>();

      let count = 0;

      while (index !== -1) {
        if (code.charAt(index - 1) !== ":") {
          const stringEnd = code.indexOf('"', index + searchString.length + 2);

          const module = code.slice(index + searchString.length + 1, stringEnd);

          const resolved = await this.resolve(module, id);

          if (resolved) {
            let name = `__pixiTexture${count++}`;
            if (importedTextures.has(resolved.id))
              name = importedTextures.get(name)!;

            importedTextures.set(resolved.id, name);

            s.prependLeft(index, ":");
            s.overwrite(index + searchString.length + 1, stringEnd, name);
          }
        }

        index = code.indexOf(searchString, index + 1);
      }

      if (count > 0) {
        const textureImports = [
          "/* pixi texture imports */",
          ...[...importedTextures].map(
            ([module, name]) => `import ${name} from "${module}?texture";`
          ),
        ].join("\n");

        const { descriptor } = parse(code);

        if (descriptor.scriptSetup) {
          s.prependLeft(
            descriptor.scriptSetup.loc.start.offset,
            textureImports
          );
        } else {
          s.prepend(
            [
              `<script setup ${
                descriptor.script?.lang === "ts" ? 'lang="ts"' : ""
              }>`,
              textureImports,
              "</script>",
            ].join("\n")
          );
        }

        return {
          code: s.toString(),
          map: s.generateMap({ includeContent: true }),
        };
      }
    },
    enforce: "pre",
    resolveId(id) {},
    load(id) {
      if (id.endsWith("?texture")) {
        const url = new URL(id);
        url.searchParams.delete("texture");

        return [
          `import texturePath from "${url}";`,
          `import { Texture } from "pixi.js";`,
          `export default Texture.from(texturePath)`,
        ].join("\n");
      }
    },
  };
}

const pixiElementNames = [
  "container",
  "sprite",
  "graphics",
  "text",
  "bitmap-text",
  "tiling-sprite",
  "animated-sprite",
  "mesh",
  "simple-plane",
  "nine-slice-plane",
  "simple-rope",
];

const elementPrefix = "pixi-";

export const isPixiElement = (name: string) => {
  let normalizedName = name.replace(/[A-Z]/g, (m) => "-" + m.toLowerCase());
  if (normalizedName.startsWith("-")) normalizedName = normalizedName.slice(1);

  return (
    pixiElementNames.includes(normalizedName) ||
    (normalizedName.startsWith(elementPrefix) &&
      pixiElementNames.includes(normalizedName.slice(elementPrefix.length)))
  );
};

export const isCustomElement = isPixiElement;

export default vuePixi;
