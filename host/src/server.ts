import express from "express";
import { render } from "./entry-server";

const port = 3000;
const clientPublicPath = `http://localhost:${port}/client/`;

const server = express();

// Serve static files
server.use("/client", express.static("dist/client"));
server.use("/server", express.static("dist/server"));

// Serve favicon
server.get("/favicon.ico", (req, res) => {
  res.status(204).end();
});

// Handle root route
server.get("/", async (req, res) => {
  try {
    const { appHtml } = await render();

    res.send(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Vue SSR with Hydration</title>
        </head>
        <body>
          <div id="app">${appHtml}</div>
          <!-- Load the shell's client.js -->
          <script src="${clientPublicPath}client.js"></script>
        </body>
      </html>
    `);
  } catch (error) {
    console.error("Error during SSR:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Start the server
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
