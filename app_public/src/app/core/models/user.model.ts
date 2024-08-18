/**
 * @fileOverview Interface for defining the structure of a User.
 */

/**
 * @interface User
 * @description Represents a user within the system, including their unique identifier, email, and optional properties such as password and edit mode status.
 * 
 * @property {string} _id - The unique identifier for the user.
 * @property {string} email - The email address of the user, used for authentication and communication.
 * @property {string} [password] - The user's password, which is optional when interfacing with certain parts of the application.
 * @property {boolean} [isEditing] - An optional flag to indicate whether the user is currently in edit mode within the application.
 */

export interface User {
  _id: string;
  email: string;
  password?: string; // optional
  isEditing?: boolean; // optional
}
