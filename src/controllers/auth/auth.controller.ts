/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { TrabajadoresModel } from '../../models/trabajadores';
import bycrypt from 'bcryptjs';
import { ProfesionesModel } from '../../models/profesiones';
import { TipoSangreModel } from '../../models/tipo_sangre';
import qr from 'qrcode';
import fs from 'fs';
// import crypto from 'crypto';
import { CryptoObserver } from '../../helpers/crypto';
import { SendMail } from '../../utils/mail/sendMail';
import { HistorialMedicoModel } from '../../models/historial_medico_model';
import { HfInference } from '@huggingface/inference';
import { TwilioUtils } from '../../utils/twilio/twilio_utils';
import { CloudinaryUtils } from '../../utils/cloudinary/cloudinary_utls';
import path from 'path';
import { googleVerify } from '../../helpers/google_verify';
import { UserModel } from '../../models/user';
import axios from 'axios';
import {config} from 'dotenv'
config();

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

  qrGet = async (req: Request, res: Response) => {
    // Datos que quieres codificar en el código QR
    const data = 'https://www.google.com';

    // Opciones para el código QR (puedes personalizarlo según tus necesidades)
    const options: qr.QRCodeToFileOptions = {
      // tamaño de la imagen del QR
      width: 300,
      // height: 300,

      // formato de la imagen ('png', 'svg', 'utf8', 'svg', 'terminal')
      type: 'png',
    };

    // Generar el código QR
    await qr.toFile('./codigo_qr3.png', data, options);
    // res.header('Content-Type', 'image/png');
    // qr.toFileStream(res as Response<Buffer>, data, options);

    res.json({
      ok: true,
      msg: 'QR-CODE CREADO EXITOSAMENTE',
    });
  };

  uploadFile =async (req:any, res:Response) => {
    const files = req.files;
    const contenido = fs.readFileSync(files[0].path);
    const data =  fs.readFileSync('hello.txt', 'utf-8');

     fs.writeFileSync(`./uploads/${files[0].originalname}`, contenido)
   
    res.json({
      ok: true,
      data
    });
  }
 /** 
  * Controlador para encriptacion.
  */
  encrypt = async(req:any, res: Response) => {

  // *  Obtiene los archivos subidos desde la solicitud.
  const files = req.files;
  // const filas = req.files;

  console.log(files); //* Imprime los archivos subidos en la consola.
  // const base64Image = Buffer.from(files[0].buffer, 'binary').toString('base64url');
  // console.log(base64Image)

  // *  Obtiene el contenido del primer archivo subido.
  // const contenido = files[0].buffer;
  // const fileUpdate = fs.readFileSync(files[0].buffer);
  // console.log(fileUpdate)

  // * Convierte el contenido del archivo a texto utilizando codificación UTF-8.
  // const contenidoTexto = contenido?.toString('utf-8');
  // console.table(contenidoTexto); // Muestra el contenido del archivo en formato de tabla.

  //* Obtiene el historial médico correspondiente al ID 34 desde la base de datos.
  // const historial = await HistorialMedicoModel().findOne({
  //   where: {
  //     id: 36,
  //   }
  // });
  

  // const data =  fs.readFileSync(contenido, 'hex');
  // console.log(data);

//* Genera una clave de encriptación aleatoria de 32 bytes (256 bits) utilizando el método randomBytes del módulo crypto.
// const encryptionKey = crypto.randomBytes(32);
// const historial = await HistorialMedicoModel().create({
//   diagnostico:  CryptoObserver.encryptData('Nuevos estados CRYPTO', encryptionKey),   
//   id_paciente: 6,
//   tratamiento: 'Acetaminofen'
// });


// *Ejemplo de uso: Encripta el texto 'eso es una prueba de encriptado' utilizando la clave de encriptación generada.
// const ciphertext = CryptoObserver.encryptData('eso es una prueba de encriptado', encryptionKey);

//* Convierte la clave de encriptación en formato hexadecimal para su visualización o almacenamiento.
// const s = encryptionKey.toString('hex');

//* Imprime en la consola los datos encriptados.
// console.log('Encrypted data:', ciphertext);

//* Busca en la base de datos un registro en la tabla HistorialMedicoModel donde el ID sea igual a 34.
//  const historial = await HistorialMedicoModel().findOne({
//   where: {
//     id: 34,
//   }
// });

//* Convierte el contenido del archivo a un buffer utilizando codificación hexadecimal.
// const buffer = Buffer.from(contenidoTexto!, 'hex');

// Desencripta los datos del historial médico utilizando el contenido del archivo como clave.
// const decryptedData = CryptoObserver.decryptData(historial?.dataValues.diagnostico ?? '', buffer);
// console.log('Decrypted data:', decryptedData);
// const token = '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';
// const hf = new HfInference(token) as any;

// const result = await hf.translation({
//   model: 't5-base',
//   inputs: 'Hola que tal, como estan, yo me llamo jesus y espero que esten todos bien.',
//   parameters: {
// 		'src_lang': 'es',
// 		'tgt_lang': 'en'
// 	}
// })
//   console.log(result)
  // await TwilioUtils.sendSms('Hola desde nueva clase', '+50488513318')
  const clud = new CloudinaryUtils(['jpg', 'png', 'gif']);
  const result = await clud.uploadFile(files[0].path, 'images');
  
// (Comentario no documentado) Preparación para enviar un correo electrónico.
// const mailOption = {
//   to: 'luisdejesus200122@gmail.com',
//   email: 'luisdejesus200122@gmail.com',
//   name: 'Jesus Reyes',
// filename: `${crypto.randomUUID()}-Llave-de-acceso.txt`,
// };

// // // (Comentario no documentado) Envía un correo electrónico con la clave de encriptación.
// const sendMail = new SendMail('receipt');
// await sendMail.send(
//   mailOption,
  // 'Gracias Por confiar en nosotros, Factura Enviada',
  // s,
// );

res.json({
  ok: true,
  result,
  // historial
  // clud
  // decryptedData,
  // encryptedData: historial?.dataValues.diagnostico

})

  }
   googleSignIn = async (req: Request, res: Response) => {
    const { id_token } = req.body;
    try {
        const { correo, nombre } = await googleVerify(id_token);
        let usuario = await UserModel().findOne({ where: {email: correo} });


        if (!usuario) {
            const data = {
                nombre,
                correo,
                password: 'Autenticado con Google',
            };
            usuario = await UserModel().create(data);
        }
        res.json({
            ok: true,
            usuario,
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: `Hable con el administrador: ${error}`,
        });

    }

}
sendToDiscord = async(req: Request, res: Response) => {
 try {
  const url = process.env.DISCORD_WEBHOOK_URL!;
  const data = {
    content: 'Hola como van todos, espero que esten bien!!',
    tts: true,
    flags: 2
};
  await axios.post(url, data);

  res.json({
    ok: true, 
    msg: 'Mensaje Enviado a Discord!!'
  })
 } catch (error: any) {
  console.error(`Hable con el administrador: ${error}`)
  res.status(500).json({
    ok: false,
    msg: `Hable con el administrador: ${error.message}`
  })
  
 }


}
}
