import { Request, Response } from 'express';
import { ExamenesModel } from '../../models/examenes';
import { ExamenesResultadosModel } from '../../models/examenes_resultados';
import { UserModel } from '../../models/user';
import { TrabajadoresModel } from '../../models/trabajadores';
import { ProfesionesModel } from '../../models/profesiones';

export class Controller {
  get = async (req: Request, res: Response) => {
    const examenes = await ExamenesModel().findAll();
    res.json({
      ok: true,
      examenes,
    });
  };
  getResultadosExamenes = async (req: Request, res: Response) => {
    const examenes = await ExamenesResultadosModel([
      'examenes',
      'paciente',
      'trabajador',
    ]).findAll({
      include: [
        {
          model: ExamenesModel(),
          as: 'examenes',
        },
        {
          model: UserModel(),
          as: 'paciente',
        },
        {
          model: TrabajadoresModel(['profesion']),
          as: 'trabajador',
          include: [
            {
              model: ProfesionesModel(),
              as: 'profesion',
            },
          ],
        },
      ],
    });
    res.json({
      ok: true,
      examenes,
    });
  };

  crearExamenResultado = async (req: Request, res: Response) => {
    try {
      const { body } = req;
      const examenResultado = await ExamenesResultadosModel().create(body);

      res.json({
        ok: true,
        examenResultado,
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
