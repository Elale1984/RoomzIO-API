import { deleteBed, getAllBeds, registerBed, updateBedFields } from "./BedController";
import express from "express";

export default (router: express.Router) => {
    router.post('/beds', registerBed);
    router.get('/beds', getAllBeds);
    router.delete('/beds/delete/:id', deleteBed);
    router.patch('/beds/update/:id', updateBedFields);
}