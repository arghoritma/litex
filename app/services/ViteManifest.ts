import { readFileSync, existsSync } from "fs";
import { resolve } from "path";

interface ManifestEntry {
  file: string;
  src?: string;
  isEntry?: boolean;
  css?: string[];
  assets?: string[];
}

interface ViteManifest {
  [key: string]: ManifestEntry;
}

class ViteManifestService {
  private manifest: ViteManifest | null = null;
  private manifestPath: string;
  private isDev: boolean;

  constructor() {
    // Try build directory first (production), then dist (development build)
    const buildManifestPath = resolve(process.cwd(), "build/.vite/manifest.json");
    const distManifestPath = resolve(process.cwd(), "dist/.vite/manifest.json");

    this.manifestPath = existsSync(buildManifestPath) ? buildManifestPath : distManifestPath;

    // Check if manifest exists to determine production mode
    const env = (process.env.NODE_ENV || "").trim();
    this.isDev = env !== "production";

  }

  private loadManifest(): ViteManifest | null {
    if (this.isDev) {
      return null; // In dev mode, use Vite dev server
    }

    if (this.manifest) {
      return this.manifest;
    }

    if (!existsSync(this.manifestPath)) {
      console.warn("⚠️ Vite manifest not found at:", this.manifestPath);
      return null;
    }

    try {
      const content = readFileSync(this.manifestPath, "utf-8");
      this.manifest = JSON.parse(content);
      return this.manifest;
    } catch (error) {
      console.error("❌ Error reading Vite manifest:", error);
      return null;
    }
  }

  public getAssets(entryName: string = "main.js"): {
    js: string[];
    css: string[];
  } {
    const result = { js: [] as string[], css: [] as string[] };

    if (this.isDev) {
      // In dev mode, return dev server URLs
      const vitePort = process.env.VITE_PORT || "5173";
      return {
        js: [
          `http://localhost:${vitePort}/@vite/client`,
          `http://localhost:${vitePort}/js/main.js`
        ],
        css: [],
      };
    }

    const manifest = this.loadManifest();
    if (!manifest) {
      console.warn("⚠️ Vite manifest not found, using fallback paths");
      // Fallback to default paths - only in production
      if (!this.isDev) {
        return {
          js: ["/js/main.js"],
          css: [],
        };
      }
      return result;
    }

    // Look for entry in manifest - try different possible keys
    let entry = manifest[entryName];
    if (!entry) {
      entry = manifest[`js/${entryName}`];
    }
    if (!entry) {
      entry = manifest[`resources/js/${entryName}`];
    }

    if (!entry) {
      console.warn(`⚠️ Entry "${entryName}" not found in Vite manifest`);
      console.log("📋 Available entries:", Object.keys(manifest));
      return result;
    }

    // Add main JS file
    if (entry.file) {
      result.js.push(`/${entry.file}`);
    }

    // Add CSS files
    if (entry.css && Array.isArray(entry.css)) {
      result.css.push(...entry.css.map((css) => `/${css}`));
    }

    return result;
  }

  public getScriptTag(entryName: string = "main.js"): string {
    const assets = this.getAssets(entryName);

    if (this.isDev) {
      return `<script type="module" src="${assets.js[0]}"></script>`;
    }

    return assets.js.map((src) => `<script type="module" src="${src}"></script>`).join("\n    ");
  }

  public getStyleTags(entryName: string = "main.js"): string {
    const assets = this.getAssets(entryName);

    if (assets.css.length === 0) {
      return "";
    }

    return assets.css.map((href) => `<link rel="stylesheet" href="${href}" />`).join("\n    ");
  }
}

export default new ViteManifestService();
