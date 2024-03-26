import { Model, DataTypes } from 'sequelize';
import { ConnectionDB } from '../db/conection/connection';
import { ProfesionesModel } from './profesiones';
import { RolesTrabajadoresModel } from './roles_trabajadores';
import { TipoSangreModel } from './tipo_sangre';

type includes = 'tipoSangre' | 'profesion' | 'role';

export const TrabajadoresModel = (include?: includes[]) => {
  const model = ConnectionDB.db.define<Model<ITrabajadores>>(
    'trabajadores',
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

      dni: {
        type: DataTypes.STRING,
      },

      direccion: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
      },
      tipoSangreId: {
        type: DataTypes.INTEGER,
      },
      profesionId: {
        type: DataTypes.INTEGER,
      },
      roleId: {
        type: DataTypes.INTEGER,
      },
    },
    {
      tableName: 'trabajadores',
    },
  );
  if (include && include.includes('profesion')) {
    model.hasOne(ProfesionesModel(), {
      foreignKey: 'id',
      sourceKey: 'profesionId',
      as: 'profesion',
    });
  }
  if (include && include.includes('role')) {
    model.hasOne(RolesTrabajadoresModel(), {
      foreignKey: 'id',
      sourceKey: 'roleId',
      as: 'role',
    });
  }
  if (include && include.includes('tipoSangre')) {
    model.hasOne(TipoSangreModel(), {
      foreignKey: 'id',
      sourceKey: 'tipoSangreId',
      as: 'tipoSangre',
    });
  }

  return model;
};

export interface ITrabajadores {
  id: number;
  nombre: string;
  dni: string;
  direccion: string;
  email: string;
  password: string;
  tipoSangreId: number;
  profesionId: number;
  roleId: number;
}
