const express = require("express");
const router = express.Router();
const { MergeClient, Merge } = require("@mergeapi/merge-node-client");
const db = require("../mock-db");

/**
 * Endpoint to generate a long-term account token for a newly created linked account.
 * Expects a public token from the client.
 */
router.post("/", async (req, res, next) => {
  try {
    // Retrieve the public token from the request body
    const publicToken = req.body.publicToken;

    // Ensure that the Merge API Key is available
    if (!process.env.MERGE_API_KEY) {
      console.error("MERGE_API_KEY is not set in the environment variables.");
      return res.status(500).send("Server configuration error.");
    }

    const merge = new MergeClient({
      apiKey: process.env.MERGE_API_KEY,
    });

    // Retrieve the account token using the Merge HRIS API
    const response = await merge.hris.accountToken.retrieve(publicToken);

    // Update the user record in the database with the new account token
    db.updateUser({ accountToken: response.accountToken });

    // Send a success response to the client
    res.send("Successfully generated account token!");
  } catch (error) {
    // Log the error and send a generic error response to the client
    console.error("Error generating account token:", error);
    res
      .status(500)
      .send("An error occurred while generating the account token.");
  }
});

module.exports = router;
