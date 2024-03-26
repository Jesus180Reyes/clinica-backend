import { Model, DataTypes } from 'sequelize';
import { ConnectionDB } from '../db/conection/connection';

export const ProfesionesModel = () => {
  const model = ConnectionDB.db.define<Model<IProfesiones>>(
    'profesiones',
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
    },
    {
      tableName: 'profesiones',
    },
  );

  return model;
};

export interface IProfesiones {
  id?: number;
  nombre?: string;
}
