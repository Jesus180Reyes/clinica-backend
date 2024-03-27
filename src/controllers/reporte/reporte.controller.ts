import { Request, Response } from 'express';
import { ReporteModel } from '../../models/reporte';
import { FacturaModel } from '../../models/factura';
import { UserModel } from '../../models/user';
import { TrabajadoresModel } from '../../models/trabajadores';
import { HabitacionModel } from '../../models/habitacion';
import { ConsultorioModel } from '../../models/consultorio';

export class Controller {
  get = async (req: Request, res: Response) => {
    const reportes = await ReporteModel(['factura']).findAll({
      include: [
        {
          model: FacturaModel([
            'paciente',
            'trabajadar',
            'consultorio',
            'habitacion',
          ]),
          as: 'factura',
          include: [
            {
              model: UserModel(),
              as: 'paciente',
            },
            {
              model: TrabajadoresModel(),
              as: 'trabajador',
            },
            {
              model: HabitacionModel(),
              as: 'habitacion',
            },
            {
              model: ConsultorioModel(),
              as: 'consultorio',
            },
          ],
        },
      ],
    });

    res.json({
      ok: true,
      reportes,
    });
  };
}
