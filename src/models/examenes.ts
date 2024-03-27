import { DataTypes, Model } from 'sequelize';
import { ConnectionDB } from '../db/conection/connection';


export const ExamenesModel = () => {

    const model = ConnectionDB.db.define<Model<IExamenes>>(
        'examenes',
        {
          id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
          },
          nombre: {
            type: DataTypes.STRING,
          },
          precio: {
            type: DataTypes.INTEGER,
          }
    
         
        },
        {
          tableName: 'examenes',
        },
      );

      return model;

}

export interface IExamenes {
    id?: number
    nombre?: string
    precio?: number
} 