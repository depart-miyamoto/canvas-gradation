import { eleventyPlugin } from "vite-plugin-eleventy";
import { sharpOptimizer } from "./vite-plugins/sharp-optimizer.js";
import serveEjsDynamic from "./vite-plugins/serve-ejs-dynamic.js";

const normalizePath = (value) => value?.replaceAll("\\", "/") ?? "";

export default {
  plugins: [serveEjsDynamic(), eleventyPlugin(), sharpOptimizer()],
  root: "src",
  publicDir: "../public",
  build: {
    outDir: "../dist",
    emptyOutDir: true,
    modulePreload: false,
    chunkSizeWarningLimit: 1000,
    // target: "es2020",
    rollupOptions: {
      input: {
        style: "src/assets/css/style.scss",
      },
      external: [],
      treeshake: false,
      output: {
        // エントリーファイルの命名規則を制御
        entryFileNames: (entryInfo) => {
          const jsModuleId = entryInfo.moduleIds
            .map(normalizePath)
            .find(
              (moduleId) =>
                moduleId.includes("/src/assets/js/") && moduleId.endsWith(".js"),
            );

          if (!entryInfo.name && jsModuleId) {
            return `assets/js/${jsModuleId.split("/").pop()}`;
          }

          return "assets/js/[name].js";
        },
        // チャンクファイルの命名規則を制御（チャンク分割を無効化）
        chunkFileNames: "assets/js/[name].js",
        // チャンクの分割を完全に無効化
        manualChunks: {},
        // 依存関係の共有を防ぐ
        preserveModules: false,
        // 変数名の衝突を避けるために名前空間を使用
        generatedCode: {
          symbols: true,
        },
        // 変数名の短縮を無効化
        minifyInternalExports: false,
        assetFileNames: (assetsInfo) => {
          if (
            assetsInfo.names.includes("style.css") ||
            assetsInfo.names.includes("strcss.css") ||
            assetsInfo.names.includes("top.css")
          ) {
            // CSS file names without hash
            const name = assetsInfo.names[0].replace(".css", "");
            if (name === "strcss") {
              return "assets/css/str.[ext]";
            }
            return "assets/css/[name].[ext]";
          } else if (
            assetsInfo.names.some((item) =>
              /(png|jpg|gif|webp|svg)$/.test(item),
            )
          ) {
            return (
              assetsInfo.originalFileNames[0] || "assets/images/[name].[ext]"
            );
          } else {
            return "assets/[name].[ext]";
          }
        },
      },
    },
  },
};
