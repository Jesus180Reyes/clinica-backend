import { DataTypes, Model } from 'sequelize';
import { ConnectionDB } from '../db/conection/connection';

export const HabitacionModel = () => {
  const model = ConnectionDB.db.define<Model<IHabitacion>>(
    'habitacion',
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

      cantidad_camas: {
        type: DataTypes.INTEGER,
      },

      precio_por_dia: {
        type: DataTypes.DOUBLE,
      },
    },
    {
      tableName: 'habitacion',
    },
  );

  return model;
};

export interface IHabitacion {
  id?: number;
  nombre?: string;
  cantidad_camas?: number;
  precio_por_dia?: number;
}
