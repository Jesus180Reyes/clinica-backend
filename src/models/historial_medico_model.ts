import { Model, DataTypes } from 'sequelize';
import { ConnectionDB } from '../db/conection/connection';
import { UserModel } from './user';
import { ProfesionesModel } from './profesiones';

type includes = 'paciente' | 'profesion';

export const HistorialMedicoModel = (include?: includes[]) => {
  const model = ConnectionDB.db.define<Model<IHistorialMedico>>(
    'historial_medico',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      id_paciente: {
        type: DataTypes.INTEGER,
      },
      id_profesion: {
        type: DataTypes.INTEGER,
      },
      diagnostico: {
        type: DataTypes.STRING,
      },
      tratamiento: {
        type: DataTypes.STRING,
      },
    },
    {
      tableName: 'historial_medico',
    },
  );
  if (include && include.includes('paciente')) {
    model.hasOne(UserModel(), {
      foreignKey: 'id',
      sourceKey: 'id_paciente',
      as: 'paciente',
    });
  }
  if (include && include.includes('profesion')) {
    model.hasOne(ProfesionesModel(), {
      foreignKey: 'id',
      sourceKey: 'id_profesion',
      as: 'profesion',
    });
  }

  return model;
};

export interface IHistorialMedico {
  id?: number;
  id_paciente?: number;
  id_profesion?: number;
  diagnostico?: string;
  tratamiento?: string;
}
