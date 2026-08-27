import { defineConfig, Plugin } from "vite";
import react from "@vitejs/plugin-react";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const trackHandler = require("./api/track.cjs");
const signupHandler = require("./api/user/signup.cjs");
const signinHandler = require("./api/user/signin.cjs");
const profileHandler = require("./api/user/profile.cjs");
const forgotPasswordHandler = require("./api/user/forgot-password.cjs");
const resetPasswordHandler = require("./api/user/reset-password.cjs");

function apiServerPlugin(): Plugin {
  return {
    name: "api-server-middleware",
    configureServer(server) {
      server.middlewares.use(async (req: any, res: any, next: any) => {
        const url = (req.url || "").split("?")[0];
        if (!url.startsWith("/api/")) return next();

        const mockRes = {
          statusCode: 200,
          setHeader: (key: string, val: string) => res.setHeader(key, val),
          status(code: number) { res.statusCode = code; return this; },
          json(data: any) { res.setHeader("Content-Type", "application/json"); res.end(JSON.stringify(data)); },
          end: (data: any) => res.end(data)
        };

        let body: any = null;
        if (req.method === "POST" || req.method === "PUT" || req.method === "PATCH") {
          const chunks: Buffer[] = [];
          for await (const chunk of req) chunks.push(chunk);
          const raw = Buffer.concat(chunks).toString("utf8");
          try { body = raw ? JSON.parse(raw) : {}; } catch { body = raw; }
        }

        const mockReq = { method: req.method, headers: req.headers, url: req.url, body };

        try {
          if (url === "/api/user/signup") return await signupHandler(mockReq, mockRes);
          if (url === "/api/user/signin") return await signinHandler(mockReq, mockRes);
          if (url === "/api/user/profile" || url === "/api/user/me") return await profileHandler(mockReq, mockRes);
          if (url === "/api/user/forgot-password") return await forgotPasswordHandler(mockReq, mockRes);
          if (url === "/api/user/reset-password") return await resetPasswordHandler(mockReq, mockRes);
          if (url === "/api/track") return await trackHandler(mockReq, mockRes);
          res.statusCode = 404; res.end(JSON.stringify({ error: `Route ${url} not found.` }));
        } catch (err: any) {
          console.error("API error:", err);
          res.statusCode = 500; res.end(JSON.stringify({ error: "Internal Server Error", message: err?.message }));
        }
      });
    }
  };
}

export default defineConfig({
  plugins: [react(), apiServerPlugin()],
  server: { port: 5173, host: true }
});
