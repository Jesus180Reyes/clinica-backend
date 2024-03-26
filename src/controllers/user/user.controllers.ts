import { Request, Response } from 'express';
import { UserModel } from '../../models/user';
import { TipoSangreModel } from '../../models/tipo_sangre';

export class Controller {
  getUsers = async (req: Request, res: Response) => {
    const users = await UserModel(['tipoSangre']).findAll({
      include: {
        model: TipoSangreModel(),
        as: 'tipoSangre',
      },
    });
    res.json({
      ok: true,
      users,
    });
  };
  createUser = async (req: Request, res: Response) => {
    try {
      const { body } = req;
      const user = await UserModel().create(body);

      return res.json({
        ok: true,
        msg: 'Usuario Creado Exitosamente',
        user,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        ok: false,
        msg: `Hable con el administrador: ${error} `,
      });
    }
  };
}
