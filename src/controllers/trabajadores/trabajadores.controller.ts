import { Request, Response } from 'express';
import { TrabajadoresModel } from '../../models/trabajadores';
import bycrypt from 'bcryptjs';
export class Controller {
  get = async (req: Request, res: Response) => {
    const trabajadores = await TrabajadoresModel().findAll();

    res.json({
      ok: true,
      trabajadores,
    });
  };

  crearTrabajador = async (req: Request, res: Response) => {
    try {
      const { body } = req;
      const salt = await bycrypt.genSalt(10);
      body.password = bycrypt.hashSync(body.password, salt);
      const trabajador = await TrabajadoresModel().create(body);

      res.json({
        ok: true,
        trabajador,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        ok: false,
        msg: `Hable con el administrador: ${error}`,
      });
    }
  };
}
