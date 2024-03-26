import { Model, DataTypes } from 'sequelize';
import { ConnectionDB } from '../db/conection/connection';
import { UserModel } from './user';

type includes = 'paciente';
export const SignosVitalesModel = (include?: includes[]) => {
  const model = ConnectionDB.db.define<Model<ISignosVitales>>(
    'signos_vitales',
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
      frecuencia_cardiaca: {
        type: DataTypes.INTEGER,
      },
      presion_arterial: {
        type: DataTypes.INTEGER,
      },
      frecuencia_respiratoria: {
        type: DataTypes.INTEGER,
      },
      temperatura: {
        type: DataTypes.INTEGER,
      },
      oxigeno: {
        type: DataTypes.INTEGER,
      },
      observacion_general: {
        type: DataTypes.STRING,
      },
    },
    {
      tableName: 'signos_vitales',
    },
  );
  if (include && include.includes('paciente')) {
    model.hasOne(UserModel(), {
      foreignKey: 'id',
      sourceKey: 'paciente_id',
      as: 'paciente',
    });
  }
  return model;
};

export interface ISignosVitales {
  id?: number;
  paciente_id?: number;
  frecuencia_cardiaca?: number;
  presion_arterial?: number;
  frecuencia_respiratoria?: number;
  temperatura?: number;
  oxigeno?: number;
  observacion_general?: string;
}
