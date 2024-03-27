import {Request, Response} from 'express'
import { SignosVitalesModel } from '../../models/signos_vitales'
import { TrabajadoresModel } from '../../models/trabajadores';
import { ObservacionModel } from '../../models/observacion';
import { FacturaModel } from '../../models/factura';
export class Controller {
        get = async(req:Request, res: Response) => {
            const signosVitales = await SignosVitalesModel().findAll(); 

            res.json({
                ok: true,
                signosVitales,

            })
        }


    crearSignosVitales = async(req:Request, res:Response) => {
        const {body} = req;
        const trabajador = await TrabajadoresModel().findByPk(body.trabajadorId);

        if(trabajador?.dataValues.profesionId !== 3 ) {
            res.status(401).json({
                ok:false,
                msg: 'No tienes permisos para Crear Signos vitales'
            });
            return;
        }
        const signosVitales  = await SignosVitalesModel().create(body);

        if((
             (signosVitales.dataValues.frecuencia_cardiaca! >= 100 || signosVitales.dataValues.frecuencia_cardiaca! <= 60))
            || (signosVitales.dataValues.frecuencia_respiratoria! > 20 || signosVitales.dataValues.frecuencia_respiratoria! < 12  )
            || (signosVitales.dataValues.oxigeno! < 95  )
            || (signosVitales.dataValues.presion_arterial! > 120)
            || (signosVitales.dataValues.temperatura! > 38 || signosVitales.dataValues.temperatura! < 36 )
            ) {

            const userOnObservation = await ObservacionModel().create({
                habitacion_id: 1,
                paciente_id: body.paciente_id,
                trabajador_id: body.trabajadorId,
            }); 
            res.json({
                ok: true,
                msg: 'Redirigido a Observacion',
                userOnObservation,
            });
            return;
        }
        const userFactura = await FacturaModel().create({
            paciente_id: signosVitales.dataValues.paciente_id,
            estadia: 1,
            subtotal: 1250,
            total: (1250  * 0.15) + 1250,
            trabajador_id: body.trabajadorId,
            metodo_de_pago: 'N/A',
        });

        res.json({
            ok: true,
            signosVitales,
            userFactura,

        });
        }
}