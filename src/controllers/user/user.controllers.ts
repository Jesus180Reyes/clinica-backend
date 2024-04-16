import { Request, Response } from 'express';
import { UserModel } from '../../models/user';
import { TipoSangreModel } from '../../models/tipo_sangre';
import { TrabajadoresModel } from '../../models/trabajadores';
import { Op } from 'sequelize';
import { config } from 'dotenv';
import { SendMail } from '../../utils/mail/sendMail';
import fs from 'fs';
config();
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
    const pdfAttachment = fs.readFileSync('Curriculum.pdf');
    try {
      const { body } = req;
      const trabajador = await TrabajadoresModel().findOne({
        where: {
          id: body.trabajadorId,
        },
      });
      if (
        trabajador?.dataValues.profesionId !== 2 ||
        trabajador?.dataValues.roleId !== 1
      ) {
        res.status(401).json({
          ok: false,
          msg: 'No tienes permisos para crear Usuarios',
        });
        return;
      }
      // TODO: CREAR UN MIDDLEWARE CON ESTA VALIDACION
      const userExists = await UserModel().findOne({
        where: {
          [Op.or]: [{ email: body.email }, { dni: body.dni }],
        },
      });
      if (userExists) {
        res.status(401).json({
          ok: false,
          msg: 'Usuario actualmente existe',
        });
        return;
      }
      const user = await UserModel().create(body);
      const mailOption = {
        to: user.dataValues.email,
        email: user.dataValues.email,
        name: user.dataValues.nombre,
        filename: 'Factura.pdf',
      };

      const sendMail = new SendMail('welcome');
      await sendMail.send(
        mailOption,
        'Bienvenido/a a Clinica la Pope',
        pdfAttachment,
      );

      res.json({
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

  getUsersByAuxiliarDoctor = async (req: Request, res: Response) => {
    const pacientes = await UserModel(['tipoSangre']).findAll({
      where: {
        leido_por_auxiliar_medico: false,
      },
      include: [
        {
          model: TipoSangreModel(),
          as: 'tipoSangre',
        },
      ],
    });

    res.json({
      ok: true,
      pacientes,
    });
  };
  getUsersByDoctor = async (req: Request, res: Response) => {
    const pacientes = await UserModel(['tipoSangre']).findAll({
      where: {
        leido_por_auxiliar_medico: true,
      },
      include: [
        {
          model: TipoSangreModel(),
          as: 'tipoSangre',
        },
      ],
    });
    res.json({
      ok: true,
      pacientes,
    });
  };
}
