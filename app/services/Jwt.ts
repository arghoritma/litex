import jwt from "jsonwebtoken"
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET || "default_secret";

export const signToken = (payload: object) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });
};

/**
 * Verifies a JWT token using the configured secret
 * @param {string} token - The JWT token to verify
 * @returns {object|null} The decoded token payload if valid, null if invalid or expired
 * 
 * @description
 * Attempts to verify and decode a JWT token using the application's secret key.
 * Returns null if the token is invalid, expired, or malformed, providing safe
 * error handling for authentication flows.
 */
export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
};
