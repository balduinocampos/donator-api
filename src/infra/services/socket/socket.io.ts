import { Server, Socket } from "socket.io";
import { createServer, Server as HttpServer } from "http";
import { appExpress } from "@/bootstrap/app";
import { env } from "@/shared/env/env";

export class SocketServer {
  private io: Server;
  public readonly httpServer: HttpServer;
  private readonly PORT = env.PORT;

  constructor() {
    this.httpServer = createServer(appExpress);
    this.io = new Server(this.httpServer, {
      cors: { origin: env.ALLOWED_HOSTS.split(",").map((host) => host.trim()) },
    });

    this.initializeEvents();
  }

  private initializeEvents() {
    this.io.on("connection", (socket: Socket) => {
      // 1. Join no room do utilizador (Essencial para enviar mensagens privadas)
      socket.on("join", (userId: string) => {
        socket.join(userId);
        console.log(`User ${userId} joined their private room`);
      });

      // 3. Evento de Chat/Mensagens genérico
      socket.on("message:send", (data: { to: string; content: string }) => {
        this.sendMessage(data.to, "message:received", data.content);
      });

      socket.on("disconnect", () => {
        console.log("Client disconnected:", socket.id);
      });
    });
  }

  // Método genérico para enviar mensagens de qualquer lugar do backend
  public sendMessage(userId: string, event: string, payload: any) {
    this.io.to(userId).emit(event, payload);
  }

  public listen() {
    this.httpServer.listen(this.PORT, () => {
      console.log(`## 🚀 Socket & HTTP Server running at: ${this.PORT}`);
    });
  }
}

// Exportamos uma única instância (Singleton)
export const socketService = new SocketServer();