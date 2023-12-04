const express = require("express");
const router = express.Router();
const { MergeClient, Merge } = require("@mergeapi/merge-node-client");
const db = require("../mock-db");

/**
 * Endpoint to create a link token used for initiating a Merge link session.
 * This token facilitates the linking of an end-user's external account.
 */
router.post("/", async (req, res, next) => {
  try {
    // Load the user's details from the mock database
    // This simulates the user attempting to create a linked account
    const user = await db.loadUser();

    // Verify that the Merge API Key is set in the environment variables
    if (!process.env.MERGE_API_KEY) {
      console.error("MERGE_API_KEY is not set in the environment variables.");
      return res.status(500).send("Server configuration error.");
    }

    const merge = new MergeClient({
      apiKey: process.env.MERGE_API_KEY,
      // The `accountToken` can be omitted if not available (e.g., during an initial Link session)
      accountToken: user.accountToken,
    });

    // Create a link token with the user's details
    const response = await merge.hris.linkToken.create({
      endUserEmailAddress: user.email,
      endUserOrganizationName: user.organization,
      endUserOriginId: user.id,
      categories: [
        Merge.hris.CategoriesEnum.Hris,
        Merge.hris.CategoriesEnum.Ticketing,
      ],
      linkExpiryMins: 30, // 30 minutes is both the default and minimum value
    });

    // Send the generated link token back to the client
    res.send({ linkToken: response.linkToken });
  } catch (error) {
    // Log the error and provide a generic error response to the client
    console.error("Error creating link token:", error);
    res.status(500).send("An error occurred while creating the link token.");
  }
});

module.exports = router;
