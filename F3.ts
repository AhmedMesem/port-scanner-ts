import * as net from "net";
const services: Record<number,string> = { 80: "HTTP", 22: "SSH", 25: "SMTP" }; // use Record type for object with number keys and string values
function isPortOpen(port: number) { // add number type for port parameter
  return new Promise<boolean>((resolve, reject) => { // add boolean type for promise resolution value
    const socket = net.createConnection(port, "127.0.0.1");
    socket.on("connect", () => {
      socket.destroy();
      resolve(true); // add true as argument for resolve function
    });
    socket.on("error", () => {
      resolve(false); // add false as argument for resolve function
    });
  });
}
async function scanPorts() {
  for (let port = 1; port <= 65535; port++) {
    const isOpen = await isPortOpen(port);
    if (isOpen) {
      const serviceName = services[port] || "unknown";
      console.log(`Port ${port} (${serviceName}) is open`);
    }
  }
}
scanPorts();
