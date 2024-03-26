import { DataTypes, Model } from 'sequelize';
import { ConnectionDB } from '../db/conection/connection';

export const ConsultorioModel = () => {
  const model = ConnectionDB.db.define<Model<IConsultorio>>(
    'consultorio',
    {
      id: {
        type: DataTypes.NUMBER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      nombre: {
        type: DataTypes.STRING,
      },

      precio: {
        type: DataTypes.NUMBER,
      },
      id_departamento: {
        type: DataTypes.NUMBER,
        unique: true,
      },
    },
    {
      tableName: 'consultorio',
    },
  );

  return model;
};
export interface IConsultorio {
  id?: number;
  nombre?: string;
  precio?: number;
  id_departamento?: number;
}
