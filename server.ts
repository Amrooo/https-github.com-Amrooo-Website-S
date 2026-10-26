import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { createServer as createViteServer } from "vite";
import path from "path";

async function startServer() {
  const app = express();
  const httpServer = createServer(app);
  const io = new Server(httpServer, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });

  const PORT = 3000;

  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  app.use(express.json());

  // In-memory store for user-to-socket mapping
  // In a real app, this would be in a database or Redis
  const userSockets = new Map<string, string>();

  io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    socket.on("register", (userId: string) => {
      userSockets.set(userId, socket.id);
      console.log(`User ${userId} registered with socket ${socket.id}`);
    });

    socket.on("disconnect", () => {
      // Clean up mapping
      for (const [userId, socketId] of userSockets.entries()) {
        if (socketId === socket.id) {
          userSockets.delete(userId);
          console.log(`User ${userId} disconnected`);
          break;
        }
      }
    });
  });

  // API key middleware for security
  const requireApiKey = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const apiKey = req.headers['x-api-key'];
    const validApiKey = process.env.INTERNAL_API_KEY;
    
    // Vulnerability Fix: Removed hardcoded fallback. The system now strictly requires an environment variable.
    if (!validApiKey) {
      console.warn("SECURITY WARNING: INTERNAL_API_KEY environment variable is not set. API routes are locked.");
      return res.status(500).json({ success: false, message: "Server configuration error." });
    }

    if (!apiKey || apiKey !== validApiKey) {
      return res.status(401).json({ success: false, message: "Unauthorized: Invalid API Key" });
    }
    next();
  };

  // API to trigger a notification (e.g., from an external service or internal logic)
  app.post("/api/notify", requireApiKey, (req, res) => {
    const { userId, title, message, type } = req.body;

    if (userId === "all") {
      io.emit("notification", { title, message, type, timestamp: new Date() });
      return res.json({ success: true, message: "Broadcast sent" });
    }

    const socketId = userSockets.get(userId);
    if (socketId) {
      io.to(socketId).emit("notification", { title, message, type, timestamp: new Date() });
      return res.json({ success: true, message: `Notification sent to user ${userId}` });
    }

    res.status(404).json({ success: false, message: "User not connected" });
  });

  // Mock endpoint to simulate an accident report status change
  app.post("/api/mock/accident-update", requireApiKey, (req, res) => {
    const { reportId, status } = req.body;
    // In a real app, we'd find the userId associated with this reportId
    // For this demo, we'll broadcast to everyone
    io.emit("notification", {
      title: "Report Status Updated",
      message: `Your accident report ${reportId} is now ${status}.`,
      type: "accident",
      timestamp: new Date()
    });
    res.json({ success: true });
  });

  // Mock endpoint to simulate a registration renewal alert
  app.post("/api/mock/registration-alert", requireApiKey, (req, res) => {
    const { vehiclePlate } = req.body;
    io.emit("notification", {
      title: "Registration Renewal",
      message: `Your vehicle ${vehiclePlate} registration expires in 30 days.`,
      type: "registration",
      timestamp: new Date()
    });
    res.json({ success: true });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  httpServer.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer().catch(console.error);
