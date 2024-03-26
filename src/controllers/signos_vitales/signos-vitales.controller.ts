import {Request, Response} from 'express'
import { SignosVitalesModel } from '../../models/signos_vitales'
export class Controller {
        get = async(req:Request, res: Response) => {
            const signosVitales = await SignosVitalesModel().findAll(); 

            res.json({
                ok: true,
                signosVitales,

            })
        }
}