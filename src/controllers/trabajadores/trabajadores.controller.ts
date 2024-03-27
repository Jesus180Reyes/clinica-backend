import { Request, Response } from 'express';
import { TrabajadoresModel } from '../../models/trabajadores';
export class Controller {
  get = async (req: Request, res: Response) => {
    const trabajadores = await TrabajadoresModel().findAll();

    res.json({
      ok: true,
      trabajadores,
    });
  };
}
