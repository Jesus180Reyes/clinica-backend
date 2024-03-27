import { DataTypes, Model } from 'sequelize';
import { ConnectionDB } from '../db/conection/connection';
import { TipoSangreModel } from './tipo_sangre';
type includes = 'tipoSangre';
export const UserModel = (include?: includes[]) => {
  const model = ConnectionDB.db.define<Model<IUsers>>(
    'pacientes',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },

      dni: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      nombre: {
        type: DataTypes.STRING,
      },
      direccion: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      tipoSangreId: {
        type: DataTypes.INTEGER,
      },
      birthDay: {
        type: DataTypes.DATE,
      },
      leido_por_auxiliar_medico: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      tableName: 'pacientes',
    },
  );
  if (include && include.includes('tipoSangre')) {
    model.hasOne(TipoSangreModel(), {
      foreignKey: 'id',
      sourceKey: 'tipoSangreId',
      as: 'tipoSangre',
    });
  }

  return model;
};
export interface IUsers {
  id?: number;
  dni?: string;
  nombre?: string;
  direccion?: string;
  email?: string;
  tipoSangreId?: string;
  birthDay?: Date;
  leido_por_auxiliar_medico?: boolean;
}
