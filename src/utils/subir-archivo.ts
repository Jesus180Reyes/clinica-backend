/* eslint-disable @typescript-eslint/no-explicit-any */
import path from 'path';
export const subirArchivo = (files: any, extensionesValidas =  ['png', 'jpg', 'jpeg', 'gif'], carpeta= '') => {
    return new Promise((resolve, reject) => {

        const { archivo } = files;

        const nombreCortado = archivo.name.split('.');

        const extension = nombreCortado[nombreCortado.length - 1];
     
        if (!extensionesValidas.includes(extension)) {
          return  reject(`La extension ${extension} no es permitida - ingresa: ${extensionesValidas}`);
            
        }

        const nombreTemp = crypto.randomUUID() + '.' + extension;
        const uploadPath = path.join(__dirname, '../uploads/', carpeta,nombreTemp);

        archivo.mv(uploadPath, (err: any) => {
            if (err) {
              reject(err);
            }

           resolve(nombreTemp);
        });
    });
}