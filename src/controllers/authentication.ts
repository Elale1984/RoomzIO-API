import { createUser, getUserByEmail, getUserByUsername } from "../db/users";
import express from "express";
import { authentication, random } from '../helpers';

export const login = async (req: express.Request, res: express.Response) => {
    try {
        const { username, password } = req.body;

        if(!username || !password) {
            return res.sendStatus(400);
        }

        const user = (await getUserByUsername(username).select('+authentication.salt +authentication.password'));

        if(!user){
            return res.sendStatus(400);
        }

        const expectedHash = authentication(user.authentication.salt, password);

        if(user.authentication.password != expectedHash) {
            return res.sendStatus(403);
        }

        const salt = random();
        user.authentication.sessionToken = authentication(salt, user._id.toString());
        await user.save();

        res.cookie('ROOMZIO-AUTH', user.authentication.sessionToken, { domain: 'localhost', path: '/'});
        return res.status(200).json(user).end();

    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const register =async (req: express.Request, res: express.Response) => {
    try {
        const { firstName, lastName, username, userType, email, password } = req.body;

        if(!firstName || !lastName || !userType || !username || !email || !password) {
            return res.status(400);
        }

        const existingUser = await getUserByUsername(username);

        if(existingUser){
            return res.status(400);
        }

        const salt = random();
        const user = await createUser({
            firstName,
            lastName,
            username,
            userType,
            email,
            authentication: {
                salt,
                password: authentication(salt, password),
            },
        });

        return res.status(200).json(user).end();
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}