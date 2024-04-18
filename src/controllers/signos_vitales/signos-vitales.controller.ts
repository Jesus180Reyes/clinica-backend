/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import {  SignosVitalesModel } from '../../models/signos_vitales';
import { TrabajadoresModel } from '../../models/trabajadores';
import { ObservacionModel } from '../../models/observacion';
import { FacturaModel, IFactura } from '../../models/factura';
import { IUsers, UserModel } from '../../models/user';
import {  TipoSangreModel } from '../../models/tipo_sangre';
import { SendMail } from '../../utils/mail/sendMail';
import moment from 'moment';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs
export class Controller {
  get = async (req: Request, res: Response) => {
    const signosVitales = await SignosVitalesModel(['paciente']).findAll({
      include: [
        {
          model: UserModel(['tipoSangre']),
          as: 'paciente',
          include: [
            {
              model: TipoSangreModel(),
              as: 'tipoSangre',
            },
          ],
        },
      ],
    });

    res.json({
      ok: true,
      signosVitales,
    });
  };

  crearSignosVitales = async (req: Request, res: Response) => {
    try {
      const { body } = req;
      const trabajador = await TrabajadoresModel().findByPk(body.trabajadorId);

      if (
        trabajador?.dataValues.profesionId !== 3 &&
        trabajador?.dataValues.roleId !== 2
      ) {
        res.status(401).json({
          ok: false,
          msg: 'No tienes permisos para Crear Signos vitales',
        });
        return;
      }
      const signosVitales = await SignosVitalesModel().create(body);

      if (
        signosVitales.dataValues.frecuencia_cardiaca! >= 100 ||
        signosVitales.dataValues.frecuencia_cardiaca! <= 60 ||
        signosVitales.dataValues.frecuencia_respiratoria! > 20 ||
        signosVitales.dataValues.frecuencia_respiratoria! < 12 ||
        signosVitales.dataValues.oxigeno! < 95 ||
        signosVitales.dataValues.presion_arterial! > 120 ||
        signosVitales.dataValues.temperatura! > 38 ||
        signosVitales.dataValues.temperatura! < 36
      ) {
      const userOnObservation = await ObservacionModel().create({
        habitacion_id: 1,
        paciente_id: body.paciente_id,
        trabajador_id: body.trabajadorId,
      });
      
        res.json({
          ok: true,
          msg: 'Redirigido a Observacion',
          userOnObservation,
        });
        return;
      }
      const estadia = await SignosVitalesModel().count({
        where: {
          paciente_id: body.paciente_id,
        }
      })
        
      const user = await UserModel().findByPk(body.paciente_id);
      const header = {
        columns: await this.createPDFHeader( `Factura de Clinica UTH para paciente: ${user?.dataValues.nombre}`),
        columnGap: 10,
        margin: [0, 0, 0, 30]
      } 
      const mainTablePDF = {
        table: {
          headerRows: 1,
          widths: ['*', '*'],
          fillColor: '#01595C',
          body: await this.createDescriptionSection(signosVitales.dataValues, user?.dataValues),
        }
      }
      const signosVitalesExistentes = await SignosVitalesModel().findAll({
        where: {
          $leido_por_doctor$: false,
          paciente_id: body.paciente_id
        }
      })
      const dataTable = {
        margin: [30, 30, 30, 30],
       columnGap: 10,
        table: {
          headerRows: 1,
          widths: ['*', '*'],
          fillColor: '#01595C',
          layout: {
            defaultBorder: false
        },
       
          body: await this.createFacturaSection(signosVitalesExistentes)

        }
      }
      const userFactura = await FacturaModel().create({
        paciente_id: signosVitales.dataValues.paciente_id,
        estadia: estadia,
        subtotal: 1250  * estadia,
        total: (1250 * 0.15) + (1250 * estadia),
        trabajador_id: body.trabajadorId,
        metodo_de_pago: 'N/A',
      });
      const receiptTable = {
        margin: [30, 30, 30, 30],
       columnGap: 10,
        table: {
          headerRows: 1,
          widths: ['*', '*'],
          fillColor: '#01595C',
          layout: {
            defaultBorder: false
        },
       
          body: await this.createReceiptn(userFactura.dataValues)

        }
      }
     
      const pdf: any = {
        content: [
          header,
          mainTablePDF,
          dataTable,
          receiptTable
        ]
      };
      
      const mailOption = {
        to: user?.dataValues.email,
        email: user?.dataValues.email,
        name: user?.dataValues.nombre,
        filename: 'Factura.pdf',
      };
      pdfMake.createPdf(pdf).getBuffer(async(data) => {
        const sendMail = new SendMail('receipt');
      await sendMail.send(
        mailOption,
        'Gracias Por confiar en nosotros, Factura Enviada',
        data,
      );
      });
      
      res.json({
        ok: true,
        signosVitales,
        userFactura,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        ok: false,
        msg: `Hable con el Administrador: ${error}`,
      });
    }
  };

  actualizarStatus = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const dataUpdated = { leido_por_doctor: true };
      const status = await SignosVitalesModel().update(dataUpdated, {
        where: { id: id },
      });

      res.json({
        ok: true,
        msg: 'Status Actualizado',
        status,
      });
    } catch (error: any) {
      console.error(error.message);
      return res.status(500).json({
        ok: false,
        msg: `Hable con el administrador: ${error}`,
      });
    }
  };
  async createPDFHeader( checkName: string) {
    // const result: any = await this.getImageBase64(logo);
    const currentDate = moment().format('DD-MM-YYYY');
    const header = [
      // {
      //   image: `data:image/jpeg;base64,${result}`,
      //   width: 68
      // },
      {
        width: '65%',
        margin: [15, 20, 0, 0],
        fontSize: 15,
        color: '#01595C',
        text: checkName
      },
      {
        width: '10%',
        bold: true,
        color: '#657685',
        margin: [0, 20, 0, 0],
        text: 'Fecha:'
      },
      {
        width: '20%',
        color: '#657685',
        margin: [-5, 20, 0, 0],
        text: currentDate
      }
    ]
    return header;
  }
  async createDescriptionSection(checkData: any, user: IUsers | undefined, ) {
    // const project: any = await this.getNameProject(checkData.project);
    const border = [true, true, true, true];
    const borderTitle = ['#01595C', '#01595C', '#FFFFFF', '#01595C'];
    const borderText = ['#01595C', '#01595C', '#01595C', '#01595C'];
    const data = [
      
      [

        {
          colSpan: 2,
          text: 'Descripción',
          fillColor: '#01595C',
          color: '#FFFFFF',
          fontSize: 12,
        },
        {
          text: '',
          fillColor: '#01595C',
        }
      ],
      [
        {
          text: 'Paciente:',
          color: '#657685',
          bold: true,
          border: border,
          borderColor: borderTitle
        },
        {
          text: user?.nombre,
          color: '#657685',
          border: border,
          borderColor: borderText,
        }
      ],
     
      [
        {
          text: 'Ubicación:',
          color: '#657685',
          bold: true,
          border: border,
          borderColor: borderTitle
        },
        {
          text: user?.direccion,
          color: '#657685',
          border: border,
          borderColor: borderText
        }
      ],
      [
        {
          text: 'Correo Electronico:',
          color: '#657685',
          bold: true,
          border: border,
          borderColor: borderTitle
        },
        {
          text: user?.email,
          color: '#657685',
          border: border,
          borderColor: borderText
        }
      ],
      
      [
        {
          text: 'Fecha y hora de inicio:',
          color: '#657685',
          bold: true,
          border: border,
          borderColor: borderTitle
        },
        {
          text: moment(checkData.start_date).format('YYYY-MM-DD HH:mm:ss'),
          color: '#657685',
          border: border,
          borderColor: borderText
        }
      ],
     
    ]
    return data;
  }
  async createFacturaSection( signos: any[], ) {
    // const project: any = await this.getNameProject(checkData.project);
    const data:any = [];
    const border = [true, true, true, true];
    const borderTitle = ['#01595C', '#01595C', '#FFFFFF', '#01595C'];
    const borderText = ['#01595C', '#01595C', '#01595C', '#01595C'];
    signos.forEach((e) => {
      
      data.push([
          {
              colSpan: 2,
              text: '',
              fillColor: '#FFFFFF',
              color: '#FFFFFF',
              fontSize: 12,
              margin: [0, 15], // Agregar margen superior e inferior a la descripción
              opacity: 0 ,
              borderColor: ['#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF'], // Hacer transparentes los bordes izquierdo y derecho

          },
          {
              text: '',
              fillColor: '#FFFFFF',
              borderColor: ['#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF'], // Hacer transparentes los bordes izquierdo y derecho
              margin: [0, 15], // Agregar margen superior e inferior a la descripción
              opacity: 0 ,
              // borderColor: 'rgba(0, 0, 0, 0)'

          }
      ]);
      data.push([
          {
              colSpan: 2,
              text: 'Signos Vitales',
              fillColor: '#01595C',
              color: '#FFFFFF',
              fontSize: 12,
          },
          {
              text: '',
              fillColor: '#01595C',
          }
      ]);
      
      data.push([
          {
              text: 'Frecuencia Cardiaca:',
              color: '#657685',
              bold: true,
              border: border,
              borderColor: borderTitle
          },
          {
              text: e?.frecuencia_cardiaca,
              color: '#657685',
              border: border,
              borderColor: borderText,
          }
      ]);
      
      data.push([
          {
              text: 'Frecuencia Respiratoria:',
              color: '#657685',
              bold: true,
              border: border,
              borderColor: borderTitle
          },
          {
              text: e?.frecuencia_respiratoria,
              color: '#657685',
              border: border,
              borderColor: borderText
          }
      ]);
      data.push([
          {
              text: 'Presion Arterial:',
              color: '#657685',
              bold: true,
              border: border,
              borderColor: borderTitle
          },
          {
              text: e?.presion_arterial,
              color: '#657685',
              border: border,
              borderColor: borderText
          }
      ]);
      data.push([
          {
              text: 'Temperatura:',
              color: '#657685',
              bold: true,
              border: border,
              borderColor: borderTitle
          },
          {
              text: e?.temperatura,
              color: '#657685',
              border: border,
              borderColor: borderText
          }
      ]);
      data.push([
          {
              text: 'Observacion General:',
              color: '#657685',
              bold: true,
              border: border,
              borderColor: borderTitle
          },
          {
              text: e?.observacion_general,
              color: '#657685',
              border: border,
              borderColor: borderText
          }
      ]);

      // Agrega aquí el resto de las filas de la tabla...
  });
   
    return data
  }

  async createReceiptn( user: IFactura | undefined, ) {
    // const project: any = await this.getNameProject(checkData.project);
    const border = [true, true, true, true];
    const borderTitle = ['#01595C', '#01595C', '#FFFFFF', '#01595C'];
    const borderText = ['#01595C', '#01595C', '#01595C', '#01595C'];
    const data = [
      
      [

        {
          colSpan: 2,
          text: 'Factura de pago',
          fillColor: '#01595C',
          color: '#FFFFFF',
          fontSize: 12,
        },
        {
          text: '',
          fillColor: '#01595C',
        }
      ],
      [
        {
          text: 'Estadia:',
          color: '#657685',
          bold: true,
          border: border,
          borderColor: borderTitle
        },
        {
          text: user?.estadia,
          color: '#657685',
          border: border,
          borderColor: borderText,
        }
      ],
     
      [
        {
          text: 'Subtotal:',
          color: '#657685',
          bold: true,
          border: border,
          borderColor: borderTitle
        },
        {
          text: user?.subtotal,
          color: '#657685',
          border: border,
          borderColor: borderText
        }
      ],
      [
        {
          text: 'Total a pagar:',
          color: '#657685',
          bold: true,
          border: border,
          borderColor: borderTitle
        },
        {
          text: user?.total,
          color: '#657685',
          border: border,
          borderColor: borderText
        }
      ],
      
      
    ]
    return data;
  }

}
