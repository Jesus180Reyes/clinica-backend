import { DataTypes, Model } from 'sequelize';
import { ConnectionDB } from '../db/conection/connection';
export const TipoSangreModel = () => {
  const model = ConnectionDB.db.define<Model<IUsers>>(
    'tipoSangre',
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
      tableName: 'tipoSangre',
    },
  );

  return model;
};
export interface IUsers {
  id?: number;
  nombre?: string;
}
