import {Request, Response} from 'express'
import { DepartamentoModel } from '../../models/departamento'

export class Controller {
        get = async(req:Request, res: Response) => {
         const departamento = await DepartamentoModel().findAll();    
            
        res.json({
            ok: true,
            departamento,
        });
        }
}