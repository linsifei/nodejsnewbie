import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // --- API 路由 ---

  // 模拟系统状态数据
  app.get("/api/system/stats", (req, res) => {
    res.json({
      uptime: "99.8%",
      latency: "12ms",
      storageUsed: "12.4 TB",
      storagePercent: 84,
      activeGuardians: 248,
      onlineCameras: 12,
      totalCameras: 12
    });
  });

  // 模拟监控画面数据
  app.get("/api/monitoring/feeds", (req, res) => {
    res.json([
      {
        id: 1,
        title: "主要活动区域",
        subtitle: "活跃中：14 名学生，2 名教师",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBtmZHGcOsOiSCreI_1N_enCrcluxLi7BtEdIALlSABGBpBn2xtyzXZvBuY3B2VlPn8kTnzcsSPbZZ_wh5itAW2038n8UH8jTvBY42kgWe6ZqDJ8Ym43RxIwUIe7AOAeYj0IXl4ROYZl8AMrakKGWHHJmd9nLpfk1lYrlQJRDVHOZG-9SUA4EgAHhBijNOy3QwralVAomW0RX-gJdUN8Po7kDS3qAgfNbhC0fceM8D3pcEZahkVL9GiF8fPZB9HIktDevIOcc9rbVEs",
        tag: "直播 • 教室 1",
        camId: "CAM_01_SOUTH",
        isPrimary: true
      },
      {
        id: 2,
        title: "户外活动区",
        subtitle: "2分钟前检测到移动",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAmKfuijuJ4sueHXNanACB2-fx_PbVzUIedK0cJyd-07vYF4R57Fl9tHhtP1ks36FRDcqLhcWMf6acgO1UA6LdioWvGgLmpm9VhcxRXxyMOwHYh9XewOjBprxF4YVKw4jpPV6BMy9qkAb7yt87KraH_3hs8xxe2oPhNbiwdOtYmyV4QxBc6K2K3TizRxT2ku81glmBTaJ3JOVJOk5jGOwoDyx6jbE7AU1FnSpJTLJo4VpfDQxKXRJiCZZMsaL3rOd3OlxHFkpQ12AsQ",
        tag: "户外活动区",
        status: "active"
      },
      {
        id: 3,
        title: "午休区",
        subtitle: "计划时间：1:00 PM - 3:00 PM",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCaL3b9BsiBGrLxwaq3rZW8Xv8kjWTBuQvEP866iQVmGKAQqYQFQg6ri0eplfeeW_giT5wLJIIuZLf9GjQbq0StZgWWAsbxIi0HrpOPNqrM7B1WCqdshx4yjkmiYPzFV6X-EIR2pJROMaHlTh2WbDtfUf5gyCJ1v3CyQPvH3jF9vXg0DKuLpNP-DW0SV3297CiduBrqVmBQsu-za5Ffq-VWZD60RK__FFUVSpQS_dx8z43dPWwvxZ7_pUKzvvZt3NiVLxJLMYVNl-9B",
        tag: "午休区",
        status: "resting"
      },
      {
        id: 4,
        title: "配餐间",
        subtitle: "午餐供应已完成",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAoItVOx11z_ObsdLhdP0DNTREamPJNJvydGPI_2htKRNh76S5W2BS9MMo46pfnPBOU5zT3RwSXxBqORNFlJY3QaHAkgbyptXofuLOMqBrxWegRDvOEwXxDo4D8e4i6qJlSVnGDIJVCReNlJ48_UStQI6dridY-qKETOHJSPX0dnVCW0RvWPyXuOAjbO4oILc_T73YXnLNQ0wH0ZceSDZ-vealKr2AUVebCn_Bow1f2mcmXBrmMJg6WcIOJ_1_rxgMV4sENtH8cTzaC",
        tag: "配餐间",
        status: "completed"
      }
    ]);
  });

  // 模拟登录接口
  app.post("/api/auth/login", (req, res) => {
    const { username, password } = req.body;
    if (username && password) {
      res.json({ success: true, token: "mock-jwt-token", user: { name: "林思飞", role: "admin" } });
    } else {
      res.status(401).json({ success: false, message: "无效的凭据" });
    }
  });

  // --- Vite 中间件配置 ---

  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
