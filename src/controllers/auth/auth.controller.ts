/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { TrabajadoresModel } from '../../models/trabajadores';
import bycrypt from 'bcryptjs';
import { ProfesionesModel } from '../../models/profesiones';
import { TipoSangreModel } from '../../models/tipo_sangre';
import qr from 'qrcode';
export class Controller {
  login = async (req: Request, res: Response) => {
    try {
      const { password, email } = req.body;

      const user = await TrabajadoresModel(['profesion', 'tipoSangre']).findOne(
        {
          where: {
            email: email,
          },
          include: [
            {
              model: ProfesionesModel(),
              as: 'profesion',
            },
            {
              model: TipoSangreModel(),
              as: 'tipoSangre',
            },
          ],
        },
      );
      if (!user) {
        return res.status(404).json({
          ok: true,
          msg: 'Usuario no existe con ese correo',
        });
      }
      const validPassword = bycrypt.compareSync(
        password,
        user?.dataValues.password ?? '',
      );
      if (!validPassword) {
        return res.status(401).json({
          ok: false,
          msg: 'Password Incorrect',
        });
      }
      res.json({
        ok: true,
        msg: 'Usuario Logueado',
        user,
      });
    } catch (error: any) {
      console.error(error.message);
      return res.status(500).json({
        ok: false,
        msg: `Hable con el administrador: ${error}`,
      });
    }
  };

  qrGet =async (req:Request, res: Response) => {
    // Datos que quieres codificar en el código QR
const data = 'https://www.google.com';

// Opciones para el código QR (puedes personalizarlo según tus necesidades)
const options:qr.QRCodeToFileOptions = {
  // tamaño de la imagen del QR
  width: 300,
  // height: 300,
  
  // formato de la imagen ('png', 'svg', 'utf8', 'svg', 'terminal')
  type: 'png'
};

// Generar el código QR
 await qr.toFile('./codigo_qr3.png',data, options);
// res.header('Content-Type', 'image/png');
// qr.toFileStream(res as Response<Buffer>, data, options);

    res.json({
      ok: true,
      msg: 'QR-CODE CREADO EXITOSAMENTE'
    });
  }
}
