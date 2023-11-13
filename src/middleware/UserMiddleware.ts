// Importing the express module and utility functions from lodash, as well as user-related functions from the database
import express from 'express';
import { get, merge } from 'lodash';
import { getUserById, getUserBySessionToken } from '../Users/Users';

/**
 * Middleware to check if the current user has the access level of admin.
 * @param {express.Request} req - The request object.
 * @param {express.Response} res - The response object.
 * @param {express.NextFunction} next - The next function.
 */
export const isAdmin = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    // Extract the current user's ID from the request and retrieve the user
    const currentUserId = get(req, 'identity._id') as string;
    const currentUser = await getUserById(currentUserId);

    // If the user is not an admin, return a 403 Forbidden status
    if (!currentUser || currentUser.userType.toString() !== 'admin') {
      return res.sendStatus(403);
    }

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

/**
 * Middleware to check if the current user has the access level of manager.
 * @param {express.Request} req - The request object.
 * @param {express.Response} res - The response object.
 * @param {express.NextFunction} next - The next function.
 */
export const isManager = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    // Extract the current user's ID from the request and retrieve the user
    const currentUserId = get(req, 'identity._id') as string;
    const currentUser = await getUserById(currentUserId);

    // If the user is not a manager, return a 403 Forbidden status
    if (!currentUser || currentUser.userType.toString() !== 'manager') {
      return res.sendStatus(403);
    }

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

/**
 * Middleware to check if the current user has the access level of manager or admin.
 * @param {express.Request} req - The request object.
 * @param {express.Response} res - The response object.
 * @param {express.NextFunction} next - The next function.
 */
export const isManagerOrAdmin = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    // Extract the current user's ID from the request and retrieve the user
    const currentUserId = get(req, 'identity._id') as string;
    const currentUser = await getUserById(currentUserId);

    // If the user is not a manager or admin, return a 403 Forbidden status
    if (!currentUser || (currentUser.userType !== 'manager' && currentUser.userType !== 'admin')) {
      return res.sendStatus(403);
    }

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

/**
 * Middleware to check if the current user has ownership of the account for account owner-only actions.
 * @param {express.Request} req - The request object.
 * @param {express.Response} res - The response object.
 * @param {express.NextFunction} next - The next function.
 */
export const isOwner = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    // Extract user ID from request parameters and current user's ID from the request
    const { id } = req.params;
    const currentUserId = get(req, 'identity._id') as string;

    // If the current user is not the owner, return a 403 Forbidden status
    if (!currentUserId || currentUserId.toString() !== id) {
      return res.sendStatus(403);
    }

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

/**
 * Middleware to check if the request is authenticated by verifying the session token.
 * @param {express.Request} req - The request object.
 * @param {express.Response} res - The response object.
 * @param {express.NextFunction} next - The next function.
 */
export const isAuthenticated = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    // Extract session token from cookies
    const sessionToken = req.cookies['ROOMZIO-AUTH'];

    // If no session token is present, return a 403 Forbidden status
    if (!sessionToken) {
      return res.sendStatus(403);
    }

    // Verify the session token and retrieve the existing user
    const existingUser = await getUserBySessionToken(sessionToken);

    // If no existing user is found, return a 403 Forbidden status
    if (!existingUser) {
      return res.sendStatus(403);
    }

    // Merge the existing user information into the request and proceed to the next middleware or route handler
    merge(req, { identity: existingUser });
    return next();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
