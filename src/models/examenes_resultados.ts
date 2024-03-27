import { DataTypes, Model } from 'sequelize';
import { ConnectionDB } from '../db/conection/connection';
import { ExamenesModel } from './examenes';
import { UserModel } from './user';
import { TrabajadoresModel } from './trabajadores';

type includes = 'paciente' | 'examenes' | 'trabajador';
export const ExamenesResultadosModel = (include?: includes[]) => {
  const model = ConnectionDB.db.define<Model<IExamenesResultados>>(
    'examenes_resultados',
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
      examenes_id: {
        type: DataTypes.INTEGER,
      },

      observacion_general: {
        type: DataTypes.STRING,
      },
      trabajador_id: {
        type: DataTypes.INTEGER,
      },
      authenticado: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      tableName: 'examenes_resultados',
    },
  );
  if (include && include.includes('examenes')) {
    model.hasOne(ExamenesModel(), {
      foreignKey: 'id',
      sourceKey: 'examenes_id',
    });
  }
  if (include && include.includes('paciente')) {
    model.hasOne(UserModel(), {
      foreignKey: 'id',
      sourceKey: 'paciente_id',
    });
  }
  if (include && include.includes('trabajador')) {
    model.hasOne(TrabajadoresModel(), {
      foreignKey: 'id',
      sourceKey: 'trabajador_id',
    });
  }

  return model;
};

export interface IExamenesResultados {
  id?: number;
  paciente_id?: number;
  examenes_id?: number;
  observacion_general?: string;
  trabajador_id?: number;
  authenticado?: boolean;
}
