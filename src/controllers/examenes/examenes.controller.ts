import {Request, Response} from 'express';
import { ExamenesModel } from '../../models/examenes';
import { ExamenesResultadosModel } from '../../models/examenes_resultados';

export class Controller {

    get = async(req: Request, res:Response) => {
        const examenes = await ExamenesModel().findAll();
        res.json({
            ok: true,
            examenes,
        })
    }
    getResultadosExamenes = async(req: Request, res:Response) => {
        const examenes = await ExamenesResultadosModel().findAll();
        res.json({
            ok: true,
            examenes,
        })
    }

    crearExamenResultado = async(req:Request, res: Response) => {
        const {body} = req;
        const examenResultado = await ExamenesResultadosModel().create(body);

        res.json({
            ok: true,
            examenResultado,
        })
    }
}