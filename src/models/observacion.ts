import { Model, DataTypes } from 'sequelize';
import { ConnectionDB } from '../db/conection/connection';
import { UserModel } from './user';
import { TrabajadoresModel } from './trabajadores';
import { HabitacionModel } from './habitacion';
type includes = 'paciente' | 'trabajador' | 'habitacion';

export const ObservacionModel = (include?: includes[]) => {
  const model = ConnectionDB.db.define<Model<IObservacion>>(
    'observacion',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      paciente_id: {
        type: DataTypes.INTEGER,
      },
      frecuencia: {
        type: DataTypes.STRING,
      },
      trabajador_id: {
        type: DataTypes.INTEGER,
      },
      habitacion_id: {
        type: DataTypes.INTEGER,
      },
    },
    {
      tableName: 'observacion',
    },
  );

  if (include && include.includes('paciente')) {
    model.hasOne(UserModel(), {
      foreignKey: 'id',
      sourceKey: 'paciente_id',
      as: 'paciente',
    });

    if (include && include.includes('trabajador')) {
      model.hasOne(TrabajadoresModel(), {
        foreignKey: 'id',
        sourceKey: 'trabajador_id',
        as: 'trabajador',
      });
    }
    if (include && include.includes('habitacion')) {
      model.hasOne(HabitacionModel(), {
        foreignKey: 'id',
        sourceKey: 'habitacion_id',
        as: 'habitacion',
      });
    }

  }
  return model;
};

export interface IObservacion {
  id?: number;
  paciente_id?: number;
  frecuencia?: string;
  trabajador_id?: number;
  habitacion_id?: number;
}
