// 任意のEJSテンプレートをVite devサーバーで動的にHTMLとして返す汎用ミドルウェア
import fs from "fs";
import path from "path";
import ejs from "ejs";
import { parseFrontMatter } from "./parse-front-matter.js";

export default function serveEjsDynamic() {
  return {
    name: "serve-ejs-dynamic",
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        // .ejsで終わるパス、または.htmlで終わるパスを対象にする
        const url = req.url && req.url.split("?")[0];
        if (!url) return next();
        // 例: /news/202506/news1.html → src/news/202506/news1.ejs
        // .html省略時も自動で.htmlを補完してEJSを探す
        let ejsPath = null;
        if (url.endsWith(".html")) {
          ejsPath = path.resolve(
            process.cwd(),
            "src" + url.replace(/\.html$/, ".ejs"),
          );
        } else if (url.endsWith(".ejs")) {
          ejsPath = path.resolve(process.cwd(), "src" + url);
        } else {
          // 末尾スラッシュや拡張子なしの場合 → /foo/bar → /foo/bar.ejs
          let tryPath = url;
          if (tryPath.endsWith("/")) tryPath = tryPath.slice(0, -1);
          ejsPath = path.resolve(process.cwd(), "src" + tryPath + ".ejs");
        }
        if (ejsPath && fs.existsSync(ejsPath)) {
          // レイアウトの自動検出（フロントマター優先、なければbase.ejs）
          const raw = fs.readFileSync(ejsPath, "utf-8");
          const frontMatter = parseFrontMatter(raw);
          const content = raw.replace(/^---[\s\S]*?---/, "").trim();
          let layout = frontMatter.layout || "layouts/base";
          if (layout.startsWith("layouts/"))
            layout = layout.replace(/^layouts\//, "");
          const layoutPath = path.resolve(
            process.cwd(),
            `src/_includes/layouts/${layout}.ejs`,
          );
          let site = {};
          const siteDataPath = path.resolve(process.cwd(), "src/_data/site.js");
          if (fs.existsSync(siteDataPath)) {
            try {
              site = (await import(siteDataPath)).default;
            } catch {
              // siteデータのインポート時のエラーは無視する
            }
          }
          // contentをEJSとして一度レンダリングしてからレイアウトに渡す
          const contentHtml = ejs.render(
            content,
            {
              ...frontMatter,
              site,
            },
            { async: false, filename: ejsPath },
          );
          if (fs.existsSync(layoutPath)) {
            const html = ejs.render(
              fs.readFileSync(layoutPath, "utf-8"),
              {
                ...frontMatter,
                site,
                content: contentHtml,
              },
              { async: false, filename: layoutPath },
            );
            res.statusCode = 200;
            res.setHeader("Content-Type", "text/html");
            res.end(html);
            return;
          } else {
            res.statusCode = 500;
            res.setHeader("Content-Type", "text/plain");
            res.end(`Layout not found: ${layoutPath}`);
            return;
          }
        }
        next();
      });
    },
  };
}
