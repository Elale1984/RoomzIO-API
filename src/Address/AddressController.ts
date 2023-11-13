import { createAddress, deleteAddressById, findAddress, getAddresses, updateAddressById } from "./Address";
import express from "express";

export const createNewAddress = async (req: express.Request, res: express.Response) => {
    try {
        const { addressStreetNumber, addressStreetName, addressCity, addressState, addressZipCode } = req.body;

        if (
            !addressStreetNumber || 
            !addressStreetName || 
            !addressCity || 
            !addressState || 
            !addressZipCode
        ) {
            return res.sendStatus(400);
        }
        
        const existingAddress = await findAddress({ addressStreetNumber: addressStreetNumber, addressStreetName: addressStreetName, addressCity: addressCity , addressState: addressState, addressZipCode: addressZipCode });

        if (existingAddress) {
            return res.status(400);
        }

        const address = await createAddress({
            addressStreetNumber, 
            addressStreetName, 
            addressCity, 
            addressState, 
            addressZipCode
        });

        return res.status(200).json(address).end();

    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }    
}
export const getAllAddresses = async (req: express.Request, res: express.Response) => {
    try {
        const addresses = await getAddresses();
        return res.status(200).json(addresses).end();
    } catch (error) {
        console.error(error);
        res.sendStatus(400); 
    }
};

export const deleteAddress = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;
        const deletedAddress = await deleteAddressById(id);
        return res.status(200).json(deletedAddress).end();
    } catch (error) {
        console.error(error);
        res.sendStatus(400); 
    }
};

export const updateAddressFields =async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;
        const updatedFields = req.body;

        const currentAddress = await findAddress({ _id: id });
        
        if (!currentAddress) {
            return res.sendStatus(404);
        }

        const updatedAddress = await updateAddressById(id, updatedFields);
        return res.status(200).json(updatedAddress).end();
    } catch (error) {
        console.error(error);
        res.sendStatus(400); 
    }
};