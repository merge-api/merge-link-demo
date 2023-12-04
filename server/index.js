const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const linkTokenRouter = require("./routes/link-token");
const accountTokenRouter = require("./routes/account-token");

// Load environment variables from .env file
dotenv.config({ path: ".env" });

const app = express();
const port = process.env.PORT || 4000;

// Enable CORS with client URL from environment variables
app.use(cors({ origin: process.env.CLIENT_URL }));

// Basic route for health check or introductory response
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Route handlers for link-token and account-token
app.use("/link-token", linkTokenRouter);
app.use("/account-token", accountTokenRouter);

// Start the server on the specified port
app.listen(port, () => {
  console.log(`Merge Link Demo Server listening on port ${port}`);
});
