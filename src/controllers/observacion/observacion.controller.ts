import {Request, Response} from 'express';
import { ObservacionModel } from '../../models/observacion';
import { UserModel } from '../../models/user';
import { TrabajadoresModel } from '../../models/trabajadores';
import { ProfesionesModel } from '../../models/profesiones';

export class Controller  {
    get = async(req:Request, res: Response) => {
        const observaciones = await ObservacionModel(['paciente','trabajador']).findAll({
            include: [
                {
                    model: UserModel(),
                    as: 'paciente'
                },
                {
                    model: TrabajadoresModel(['profesion']),
                    as: 'trabajador',
                    include: [
                        {
                            model: ProfesionesModel(),
                            attributes: ['nombre'],
                            as: 'profesion'
                        }
                    ]
                }
            ]
        });
        res.json({
            ok: true, 
            observaciones
        });
    }
}