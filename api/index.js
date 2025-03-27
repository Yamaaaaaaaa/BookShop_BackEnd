import serverless from "serverless-http";
import app from "../src/server.js"; // Import Express app

export default serverless(app);
