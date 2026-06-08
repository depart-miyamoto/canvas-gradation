/* eslint-disable */
import sharp from "sharp";
import path from "path";
import { promises as fs } from "fs";

/**
 * Vite Sharp画像最適化プラグイン
 * ビルド後に画像ディレクトリを最適化
 */
export function sharpOptimizer(options = {}) {
  const {
    // formats = ["webp"],
    formats = [],
    sizes = [],
    quality = {
      webp: 80,
      jpeg: 85,
      png: 90,
    },
  } = options;

  // 画像最適化のロジックを関数として定義
  async function optimizeImages(outputDir) {
    try {
      const imageInputDir = path.resolve("src/assets/images");
      const imageOutputDir =
        outputDir === "src"
          ? path.resolve("src/assets/images")
          : path.resolve(outputDir, "assets/images");

      // 出力ディレクトリを作成
      await fs.mkdir(imageOutputDir, { recursive: true });

      // 画像ファイルを再帰的に取得する関数
      async function getAllImageFiles(dir) {
        let results = [];
        const list = await fs.readdir(dir, { withFileTypes: true });
        for (const dirent of list) {
          const fullPath = path.join(dir, dirent.name);
          if (dirent.isDirectory()) {
            results = results.concat(await getAllImageFiles(fullPath));
          } else if (/\.(jpe?g|png|gif|tiff|webp|avif)$/i.test(dirent.name)) {
            results.push(fullPath);
          }
        }
        return results;
      }

      let imageFiles;
      try {
        imageFiles = await getAllImageFiles(imageInputDir);
      } catch (error) {
        console.log(
          "📸 Sharp: No images directory found, skipping optimization",
        );
        return;
      }

      if (imageFiles.length === 0) {
        console.log("📸 Sharp: No images found to optimize");
        return;
      }

      console.log(`📸 Sharp: Found ${imageFiles.length} image(s) to optimize`);

      // 各画像を最適化
      for (const inputPath of imageFiles) {
        // src/assets/images からの相対パスを取得
        const relPath = path.relative(imageInputDir, inputPath);
        const relDir = path.dirname(relPath);

        // 出力先ディレクトリを作成
        const targetOutputDir = path.join(imageOutputDir, relDir);
        await fs.mkdir(targetOutputDir, { recursive: true });

        try {
          // 開発時はWebPファイルが存在しない場合のみ生成
          const shouldOptimize =
            outputDir === "src"
              ? await shouldOptimizeForDev(inputPath, targetOutputDir)
              : true;

          if (shouldOptimize) {
            await optimizeImage(inputPath, targetOutputDir, {
              formats,
              sizes,
              quality,
            });
            console.log(`✅ Sharp: Optimized ${relPath}`);
          }
        } catch (error) {
          console.error(
            `❌ Sharp: Error optimizing ${relPath}:`,
            error.message,
          );
        }
      }

      console.log("✨ Sharp: Image optimization completed!");
    } catch (error) {
      console.error(
        "❌ Sharp: Error during image optimization:",
        error.message,
      );
    }
  }

  async function shouldOptimizeForDev(inputPath, outputDir) {
    const inputName = path.parse(path.basename(inputPath)).name;
    const webpPath = path.join(outputDir, `${inputName}.webp`);

    try {
      const [inputStat, webpStat] = await Promise.all([
        fs.stat(inputPath),
        fs.stat(webpPath).catch(() => null),
      ]);

      // WebPファイルが存在しない、または元ファイルの方が新しい場合は最適化
      return !webpStat || inputStat.mtime > webpStat.mtime;
    } catch {
      return true;
    }
  }

  return {
    name: "vite-sharp-optimizer",
    // apply: 'build', // 削除して開発時にも動作するようにする

    async buildStart() {
      // 開発時の初回起動時に画像最適化を実行
      if (process.env.NODE_ENV !== "production") {
        console.log("📸 Sharp: Starting development image optimization...");
        await optimizeImages("src");
      }
    },

    async writeBundle(options, bundle) {
      // ビルド時の画像最適化
      console.log("📸 Sharp: Starting build image optimization...");
      const outputDir = options.dir || "dist";
      await optimizeImages(outputDir);
    },
  };
}

/**
 * 単一画像を最適化
 */
async function optimizeImage(inputPath, outputDir, options) {
  const { formats, sizes, quality } = options;
  const inputFileName = path.basename(inputPath);
  const inputName = path.parse(inputFileName).name;

  try {
    const sharpInstance = sharp(inputPath);
    const metadata = await sharpInstance.metadata();

    // ビルド時のみ元画像をコピー（開発時はsrc内で処理するためコピー不要）
    if (
      process.env.NODE_ENV === "production" &&
      path.dirname(inputPath) !== path.dirname(outputDir)
    ) {
      const originalOutputPath = path.join(outputDir, inputFileName);
      if (!(await fs.stat(originalOutputPath).catch(() => false))) {
        await fs.copyFile(inputPath, originalOutputPath);
      }
    }

    // オリジナルと同じサイズのwebpのみ生成
    // if (metadata.width && metadata.height) {
    //   const outputFileName = `${inputName}.webp`;
    //   const outputPath = path.join(outputDir, outputFileName);
    //   await sharpInstance
    //     .clone()
    //     .resize(metadata.width, metadata.height, {
    //       withoutEnlargement: true,
    //       fastShrinkOnLoad: false,
    //     })
    //     .toFormat("webp", {
    //       quality: quality["webp"] || 80,
    //       effort: 4,
    //     })
    //     .toFile(outputPath);
    // }
  } catch (error) {
    throw new Error(`Failed to optimize image: ${error.message}`);
  }
}
