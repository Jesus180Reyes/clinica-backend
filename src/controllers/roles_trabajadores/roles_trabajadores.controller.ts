import {Request, Response} from 'express';
import { RolesTrabajadoresModel } from '../../models/roles_trabajadores';

export class Controller {
    get = async(req:Request, res:Response) => {
        const roles =await RolesTrabajadoresModel().findAll();

        res.json({
            ok: true, 
            roles,

        })
    }
}