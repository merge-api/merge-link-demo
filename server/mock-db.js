/**
 * Mock Database Module
 *
 * This module simulates a basic in-memory database for demonstration purposes.
 * It manages a single user object, providing functions to load and update user data.
 * This is not intended for production use and serves only as a placeholder for an actual database.
 */

// In-memory representation of a single user
// This simulates a user record typically stored in a database.
const user = {
  id: "7cc58dfb-87ff-423f-85f6-2dd61c517feb",
  email: "john.smith@gmail.com",
  organization: "acme",
  accountToken: undefined, // This field can be updated as needed
};

const db = {
  /**
   * Simulates loading a user from the database.
   * @returns {Object} The user object.
   */
  loadUser: async () => user,

  /**
   * Simulates updating a user in the database.
   * @param {Object} updatedUser - Object containing user properties to update.
   * @returns {Object} The updated user object.
   */
  updateUser: async (updatedUser) => ({
    ...user,
    ...updatedUser,
  }),
};

module.exports = db;
