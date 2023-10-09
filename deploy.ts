import { build, emptyDir } from "https://deno.land/x/dnt/mod.ts";

await emptyDir("./npm");

await build({
  entryPoints: [
    {
      kind: "bin",
      name: "geyik",
      path: "./main.ts",
    },
  ],
  outDir: "./npm",
  typeCheck: false,
  scriptModule: false,
  shims: {
    deno: true,
    crypto: true,
  },
  package: {
    name: "geyik",
    version: Deno.args[0],
    description: "CLI kullanarak sözcüklerin  kökenini bulun.",
    license: "MIT",
    author: "Furkan Demir",
    repository: {
      type: "git",
      url: "git+https://github.com/fdemir/geyik.git",
    },
    bugs: {
      url: "https://github.com/fdemir/geyik/issues",
    },
  },
  postBuild() {
    Deno.copyFileSync("LICENSE", "npm/LICENSE");
    Deno.copyFileSync("README.md", "npm/README.md");
  },
});
