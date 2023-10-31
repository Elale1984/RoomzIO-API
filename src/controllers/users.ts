import express from 'express';
import { deleteUserById, getUserById, getUsers, updateUserById } from '../db/users';

export const getAllUsers = async (req: express.Request, res: express.Response) => {
    try {
        const users = await getUsers();
       
        return res.status(200).json(users);

    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};

export const deleteUser = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;
        
        const deletedUser = await deleteUserById(id);

        return res.json(deletedUser);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};

export const getCurrentUserType = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;
        const currentUser = await getUserById(id);
        const currentUserType = currentUser.userType;
        
        return res.json(currentUserType);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};

// User can update only their email
export const updateUser = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;
        const { email } = req.body;

        if (!email) {
            return res.sendStatus(400);
        }

        const user = await getUserById(id);

        user.email = email;
        await user.save();  
    } catch (error) {
        
    }
}