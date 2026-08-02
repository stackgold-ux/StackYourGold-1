import { serve } from "bun";
import { join } from "path";
import { existsSync, readFileSync } from "fs";

const PORT = 3000;
const HOST = "0.0.0.0";
const DIST_DIR = join(import.meta.dir, "dist");

console.log(`Starting static server for ${DIST_DIR} on ${HOST}:${PORT}`);

// Free port first
const freePort = async () => {
  const { execSync } = await import("child_process");
  try {
    execSync(`sudo lsof -t -iTCP:${PORT} -sTCP:LISTEN | xargs -r sudo kill -9`);
    console.log(`Port ${PORT} freed.`);
  } catch (e) {
    // Port might already be free
  }
};

await freePort();

serve({
  port: PORT,
  hostname: HOST,
  fetch(req) {
    const url = new URL(req.url);
    let path = url.pathname;
    
    if (path === "/") path = "/index.html";
    
    const filePath = join(DIST_DIR, path);
    
    if (existsSync(filePath)) {
      return new Response(readFileSync(filePath), {
        headers: {
          "Content-Type": getContentType(filePath)
        }
      });
    } else {
      // SPA Fallback: serve index.html for all other routes
      return new Response(readFileSync(join(DIST_DIR, "index.html")), {
        headers: {
          "Content-Type": "text/html"
        }
      });
    }
  }
});

function getContentType(path) {
  if (path.endsWith(".html")) return "text/html";
  if (path.endsWith(".js")) return "application/javascript";
  if (path.endsWith(".css")) return "text/css";
  if (path.endsWith(".png")) return "image/png";
  if (path.endsWith(".jpg") || path.endsWith(".jpeg")) return "image/jpeg";
  if (path.endsWith(".svg")) return "image/svg+xml";
  if (path.endsWith(".gif")) return "image/gif";
  if (path.endsWith(".json")) return "application/json";
  return "application/octet-stream";
}
