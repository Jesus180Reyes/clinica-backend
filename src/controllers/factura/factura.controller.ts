import {Request, Response} from 'express';
import { FacturaModel } from '../../models/factura';
import { ConsultorioModel } from '../../models/consultorio';
import { UserModel } from '../../models/user';
import { TrabajadoresModel } from '../../models/trabajadores';
import { HabitacionModel } from '../../models/habitacion';
import { ProfesionesModel } from '../../models/profesiones';
import { ObservacionModel } from '../../models/observacion';

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

    getByPacientId = async(req:Request, res: Response) => {
        const {id} = req.params;
        const facturaPacientes = await FacturaModel(['trabajadar','paciente', 'observacion','habitacion']).findAll({
            where: {
                paciente_id: id,
                facturado: false 

            },
            include: [
                {
                    model: TrabajadoresModel(['profesion']),
                    as: 'trabajador',
                    include: [
                        {
                            model: ProfesionesModel(),
                            as: 'profesion',
                            attributes: ['nombre']
                        }
                    ]
                },
                {
                    model: UserModel(),
                    as: 'paciente'
                },
                {
                    model: ObservacionModel(),
                    as: 'observacion'
                },
                {
                    model: HabitacionModel(),
                    as: 'habitacion'
                }
            ]

        }
        ); 

        res.json({
            ok: true,
            msg: 'Facturas del Paciente',
            facturaPacientes
        })

    }

    actualizarFactura = async(req:Request, res: Response) => {
       try {
        const {id} = req.params
        const factura = await FacturaModel().update({facturado: true},{
            where: {id: id}
        })

        res.json({
            ok: true,
            factura
        })
       } catch (error) {
        console.error(error);
        return res.status(500).json({
              ok: false,
              msg: `Hable con el Administrador: ${error}`
        }); 
       }
    }
}