import { Request, Response } from 'express';
import { ProfesionesModel } from '../../models/profesiones';

export class Controller {
  get = async (req: Request, res: Response) => {
    const profesiones = await ProfesionesModel().findAll();

    res.json({
      ok: true,
      profesiones,
    });
  };
}
