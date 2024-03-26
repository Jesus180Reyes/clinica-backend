import {Request, Response} from 'express'
import { TipoSangreModel } from '../../models/tipo_sangre';
export class Controller {
        get = async(req:Request, res: Response) => {
            const tiposSangre = await TipoSangreModel().findAll(); 

            res.json({
                ok: true,
                tiposSangre,

            })
        }
}