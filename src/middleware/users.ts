import express, { response } from 'express';
import { get, merge } from 'lodash';
import { getUserById, getUserBySessionToken } from '../db/users';


// Checking the userType of the current user to make sure that they have access level of admin
export const isAdmin = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const currentUserId = get(req, 'identity._id') as string;
        const currentUser = await getUserById(currentUserId);
    
        if (!currentUser) {
            return res.sendStatus(403);
        }
    
        if (currentUser.userType.toString() != 'admin') {
            return res.sendStatus(403);
        }

        next();
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
    
}

// Checking the userType of the current user to make sure that they have access level of manager
export const isManager = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const currentUserId = get(req, 'identity._id') as string;

        const currentUser = await getUserById(currentUserId);

        if(!currentUser) {
            return res.sendStatus(403);
        }

        if(currentUser.userType.toString() != 'manager') {
            return res.sendStatus(403);
        }

        next();
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

// Checking the current user id to make sure that they have ownership of the account to do account owner only actions
export const isOwner = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const { id } = req.params;
        const currentUserId = get(req, 'identity._id') as string;


        if(!currentUserId) {
            return res.sendStatus(403);
        }

        if(currentUserId.toString() != id ) {
            return res.sendStatus(403);
        }

        next();
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};

// Checking for the sessionToken to verify authentication has been done for access.
export const isAuthenticated = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const sessionToken = req.cookies['ROOMZIO-AUTH'];
        
        if (!sessionToken) {
            return res.sendStatus(403);
        }

        const existingUser = await getUserBySessionToken(sessionToken);

        if(!existingUser) {
            return res.sendStatus(403);
        }

        merge(req, { identity: existingUser });

        return next();
    } catch (error) {
        console.log(error);
        response.sendStatus(400);
    }
}