import { registerBed } from "../controllers/BedController";
import express from "express";

export default (router: express.Router) => {
    router.post('/beds', registerBed);
}