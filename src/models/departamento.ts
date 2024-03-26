import { DataTypes, Model } from 'sequelize';
import { ConnectionDB } from '../db/conection/connection';

export const DepartamentoModel = () => {
  const model = ConnectionDB.db.define<Model<IDepartamento>>(
    'departamento',
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

      especialidad: {
        type: DataTypes.STRING,
      },
    },
    {
      tableName: 'departamento',
    },
  );

  return model;
};

export interface IDepartamento {
  id?: number;
  nombre?: string;
  especialidad?: string;
}
