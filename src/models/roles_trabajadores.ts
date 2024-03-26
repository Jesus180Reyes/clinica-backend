import { Model, DataTypes } from 'sequelize';
import { ConnectionDB } from '../db/conection/connection';

export const RolesTrabajadoresModel = () => {
  const model = ConnectionDB.db.define<Model<IRolesTrabajadores>>(
    'roles_trabajadores',
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
      tableName: 'roles_trabajadores',
    },
  );
  return model;
};

export interface IRolesTrabajadores {
  id: number;
  nombre: string;
}
