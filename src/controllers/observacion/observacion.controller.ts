import { Request, Response } from 'express';
import { ObservacionModel } from '../../models/observacion';
import { UserModel } from '../../models/user';
import { TrabajadoresModel } from '../../models/trabajadores';
import { ProfesionesModel } from '../../models/profesiones';
import { HabitacionModel } from '../../models/habitacion';

export class Controller {
  get = async (req: Request, res: Response) => {
    const observaciones = await ObservacionModel([
      'paciente',
      'trabajador',
      'habitacion',
    ]).findAll({
      include: [
        {
          model: UserModel(),
          as: 'paciente',
        },
        {
          model: HabitacionModel(),
          as: 'habitacion',
        },
        {
          model: TrabajadoresModel(['profesion']),
          as: 'trabajador',
          include: [
            {
              model: ProfesionesModel(),
              attributes: ['nombre'],
              as: 'profesion',
            },
          ],
        },
      ],
    });
    res.json({
      ok: true,
      observaciones,
    });
  };
}
