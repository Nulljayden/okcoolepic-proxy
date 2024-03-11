import createServer from '@tomphttp/bare-server-node';
import http from 'http';
import nodeStatic from 'node-static';

// Set the port to use, or use 8080 if not set
const port = process.env.PORT || 8080;

// Create a new bare server instance
const bare = createServer('/bare/');

// Create a new node-static server instance
const serve = new nodeStatic.Server('main/');

// Create a new HTTP server instance
const server = http.createServer();

// Handle incoming requests
server.on('request', (req, res) => {
  // Route the request through the bare server
  bare.route(req, res, serve);
});

// Handle incoming upgrades
server.on('upgrade', (req, socket, head) => {
  // Route the upgrade through the bare server
  bare.routeUpgrade(req, socket, head);
});

// Handle any unknown routes
server.on('*', (req, res) => {
  res.statusCode = 404;
  res.end('404 Not Found');
});

// Start the server
server.listen({
  port: port,
});

console.log(`Listening on http://localhost:${port}`);

