import express from "express";
import { authentication, random } from "../helpers/AuthenticationHelper";
import { createUser, findUser } from "../Users/Users";
const uuidv4 = require('uuid').v4;

// Initialize sessions outside the function
const sessions: Record<string, { username: string, userId: string }> = {};

export const login = async (req: express.Request, res: express.Response) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.sendStatus(400);
    }

    const user = await findUser({ username }).select(
      "+authentication.salt +authentication.password"
    );

    if (!user) {
      return res.sendStatus(400);
    }

    const expectedHash = authentication(user.authentication.salt, password);

    if (user.authentication.password !== expectedHash) {
      return res.sendStatus(403);
    }

    const salt = random();
    user.authentication.sessionToken = authentication(
      salt,
      user._id.toString()
    );
    await user.save();

    const sessionId = uuidv4();

    // Store the session ID in your sessions object or database
    sessions[sessionId] = { username, userId: user._id.toString() };

    // Set the session ID as a cookie
    res.cookie('session', sessionId, { httpOnly: true });

    return res.status(200).json(user).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const register = async (req: express.Request, res: express.Response) => {
  try {
    const { firstName, lastName, username, userType, email, title, password } =
      req.body;

    if (
      !firstName ||
      !lastName ||
      !userType ||
      !username ||
      !email ||
      !password
    ) {
      return res.status(400);
    }

    const existingUser = await findUser({ username: username });

    if (existingUser) {
      return res.status(400);
    }

    const salt = random();
    const user = await createUser({
      firstName,
      lastName,
      username,
      userType,
      email,
      title, 
      authentication: {
        salt,
        password: authentication(salt, password),
      },
      dateCreated: new Date().toLocaleDateString("en-US"),
      dateTerminated: null,
    });

    return res.status(200).json(user).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const logout = async (req: express.Request, res: express.Response) => {
  try {


    return res.status(200).json({ message: "Logout successful" }).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};