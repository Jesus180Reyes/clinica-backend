import {Request, Response} from 'express';
import { FacturaModel } from '../../models/factura';
import { ConsultorioModel } from '../../models/consultorio';
import { UserModel } from '../../models/user';
import { TrabajadoresModel } from '../../models/trabajadores';
import { HabitacionModel } from '../../models/habitacion';
import { ProfesionesModel } from '../../models/profesiones';

export class Controller {
    get = async(req: Request, res: Response) => {
        const facturas = await FacturaModel(['consultorio','paciente','trabajadar','habitacion']).findAll({
            include: [
                {
                    model: ConsultorioModel(),
                    as: 'consultorio'
                },
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
                            as: 'profesion'
                        }
                    ]
                },
                {
                    model: HabitacionModel(),
                    as: 'habitacion'
                },
            ]
        });


        res.json({
            ok: true,
            facturas,
        });
    }
}