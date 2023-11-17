import { isAdmin, isAuthenticated } from "../middleware/UserMiddleware";
import { deleteBed, getAllBeds, registerBed, updateBedFields } from "./BedController";
import express from "express";

export default (router: express.Router) => {
    router.post('/beds', isAuthenticated, isAdmin, registerBed);
    router.get('/beds', isAuthenticated, getAllBeds);
    router.delete('/beds/delete/:id', isAuthenticated, isAdmin, deleteBed);
    router.patch('/beds/update/:id', isAuthenticated, updateBedFields);
}