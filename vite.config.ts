import { defineConfig, Plugin } from "vite";
import react from "@vitejs/plugin-react";
import trackHandler from "./api/track";
import signupHandler from "./api/user/signup";
import signinHandler from "./api/user/signin";
import profileHandler from "./api/user/profile";
import forgotPasswordHandler from "./api/user/forgot-password";
import resetPasswordHandler from "./api/user/reset-password";

function apiServerPlugin(): Plugin {
  return {
    name: "api-server-middleware",
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const url = req.url?.split("?")[0] || "";
        if (!url.startsWith("/api/")) return next();

        const mockRes = {
          statusCode: 200,
          setHeader: (key: string, val: string) => res.setHeader(key, val),
          status(code: number) { res.statusCode = code; return this; },
          json(data: any) {
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify(data));
          }
        };

        let body: any = null;
        if (req.method === "POST" || req.method === "PUT" || req.method === "PATCH") {
          const chunks: any[] = [];
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
          return mockRes.status(404).json({ error: `Route ${url} not found.` });
        } catch (err: any) {
          console.error("API error:", err);
          return mockRes.status(500).json({ error: "Internal Server Error", message: err?.message });
        }
      });
    }
  };
}

export default defineConfig({
  plugins: [react(), apiServerPlugin()],
  server: { port: 5173, host: true }
});
