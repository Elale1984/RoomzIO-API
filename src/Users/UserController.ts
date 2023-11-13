import express from "express";
import {
  findUser,
  updateUserById,
  deleteUserById,
  getUserById,
  getUsers,
} from "./Users";

export const getAllUsers = async (
  req: express.Request,
  res: express.Response
) => {
  try {

    const users = await getUsers();
    return res.status(200).json(users).end();
  } catch (error) {
    console.error(error);
    res.sendStatus(400); 
  }
};

export const deleteUser = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;
    const deletedUser = await deleteUserById(id);
    return res.status(200).json(deletedUser);
  } catch (error) {
    console.error(error);
    return res.sendStatus(400);
  }
};

export const getCurrentUserType = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;

    const currentUser = await getUserById(id);

    if (!currentUser) {
      return res.status(404).json('The user you are trying to get does not exist!');
    }

    const currentUserType = currentUser.userType;
    return res.status(200).json(currentUserType);
  } catch (e) {
    console.log(e.message);
    return res.sendStatus(400);
  }
};

export const updateUserFields = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;
    const updatedFields = req.body;

    const currentUser = await findUser({ _id: id });

    if (!currentUser) {
      return res.sendStatus(404);
    }

    if ("username" in updatedFields) {
      return res.sendStatus(403);
    }

    if (currentUser._id.toString() !== id) {
      return res.sendStatus(403);
    }

    

    const updatedUser = await updateUserById(id, updatedFields);

    return res.status(200).json(updatedUser).end();
  } catch (error) {
    console.error(error);
    return res.sendStatus(400);
  }
};
