import { Request, Response } from 'express';
import { HistorialMedicoModel } from '../../models/historial_medico_model';
import { ProfesionesModel } from '../../models/profesiones';
import { UserModel } from '../../models/user';

export class Controller {
  get = async (req: Request, res: Response) => {
    const historiales = await HistorialMedicoModel([
      'profesion',
      'paciente',
    ]).findAll({
      include: [
        {
          model: ProfesionesModel(),
          as: 'profesion',
        },
        {
          model: UserModel(),
          as: 'paciente',
        },
      ],
    });

    res.json({
      ok: true,
      historiales,
    });
  };

  crearHistorialMedico = async (req: Request, res: Response) => {
    try {
      const { body } = req;
      const historialMedico = await HistorialMedicoModel().create(body);

      res.json({
        ok: true,
        historialMedico,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        ok: false,
        msg: `Hable con el Administrador: ${error}`,
      });
    }
  };
}
