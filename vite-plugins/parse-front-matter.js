// js-yamlを使ってYAMLフロントマターをパースするユーティリティ
import yaml from "js-yaml";

export function parseFrontMatter(raw) {
  const match = raw.match(/^---([\s\S]*?)---/);
  if (match) {
    try {
      return yaml.load(match[1]);
    } catch {
      return {};
    }
  }
  return {};
}
