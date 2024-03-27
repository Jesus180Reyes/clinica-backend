import { Request, Response } from 'express';
import { ConsultorioModel } from '../../models/consultorio';

export class Controller {
  get = (req: Request, res: Response) => {
    res.json({
      ok: true,
      msg: 'Get Users',
    });
  };
  post = (req: Request, res: Response) => {
    try {
    const {body} = req;
    const consultorio = ConsultorioModel().create(body)
    res.json({
      ok: true,
      consultorio,
    });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        ok: false,
        msg: `Hable con el Administrador: ${error}`
      });
      
    }
  };
}
