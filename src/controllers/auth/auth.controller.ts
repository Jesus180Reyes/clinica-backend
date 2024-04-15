/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { TrabajadoresModel } from '../../models/trabajadores';
import bycrypt from 'bcryptjs'
import { ProfesionesModel } from '../../models/profesiones';
import { TipoSangreModel } from '../../models/tipo_sangre';
export class Controller {
    
    login = async(req:Request, res: Response) => {
       try {
        const {password, email} = req.body
        
        const user = await TrabajadoresModel(['profesion','tipoSangre']).findOne({
            where: {
                email: email,
            },
            include: [
                {
                    model: ProfesionesModel(),
                    as: 'profesion'
                },
                {
                    model: TipoSangreModel(),
                    as: 'tipoSangre'
                },
            ]
        })
        if(!user) {
            return res.status(404).json({
                ok: true,
                msg: 'Usuario no existe con ese correo'
            })
        }
        const validPassword =  bycrypt.compareSync(password,user?.dataValues.password ?? '' );
        if(!validPassword) {
            return res.status(401).json({
                ok:false,
                msg: 'Password Incorrect'
            });
        }
        res.json({
            ok: true,
            msg: 'Usuario Logueado',
            user
        });
       } catch (error: any) {
        console.error(error.message)
       return res.status(500).json({
            ok: false,
            msg: `Hable con el administrador: ${error}`
        })
       }
    }
}