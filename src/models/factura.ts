import { DataTypes, Model } from 'sequelize';
import { ConnectionDB } from '../db/conection/connection';
import { ConsultorioModel } from './consultorio';
import { HabitacionModel } from './habitacion';
import { UserModel } from './user';
import { TrabajadoresModel } from './trabajadores';
import { ObservacionModel } from './observacion';
type includes =
  | 'trabajadar'
  | 'paciente'
  | 'habitacion'
  | 'observacion'
  | 'consultorio';

export const FacturaModel = (include?: includes[]) => {
  const model = ConnectionDB.db.define<Model<IFactura>>(
    'factura',
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

      trabajador_id: {
        type: DataTypes.INTEGER,
      },
      habitacion_id: {
        type: DataTypes.INTEGER,
      },
      observacion_id: {
        type: DataTypes.INTEGER,
      },
      consultorio_id: {
        type: DataTypes.INTEGER,
      },
      estadia: {
        type: DataTypes.STRING,
      },
      total: {
        type: DataTypes.DOUBLE,
      },
      metodo_de_pago: {
        type: DataTypes.STRING,
      },
    },
    {
      tableName: 'factura',
    },
  );

  if (include && include.includes('trabajadar')) {
    model.hasOne(TrabajadoresModel(), {
      foreignKey: 'id',
      sourceKey: 'trabajador_id',
      as: 'trabajador',
    });
  }

  if (include && include.includes('paciente')) {
    model.hasOne(UserModel(), {
      foreignKey: 'id',
      sourceKey: 'paciente_id',
      as: 'paciente',
    });
  }
  if (include && include.includes('habitacion')) {
    model.hasOne(HabitacionModel(), {
      foreignKey: 'id',
      sourceKey: 'habitacion_id',
      as: 'habitacion',
    });
  }
  if (include && include.includes('observacion')) {
    model.hasOne(ObservacionModel()!, {
      foreignKey: 'id',
      sourceKey: 'observacion_id',
      as: 'observacion',
    });
  }
  if (include && include.includes('consultorio')) {
    model.hasOne(ConsultorioModel()!, {
      foreignKey: 'id',
      sourceKey: 'consultorio_id',
      as: 'consultorio',
    });
  }

  return model;
};

export interface IFactura {
  id?: number;
  paciente_id?: number;
  trabajador_id?: number;
  habitacion_id?: number;
  observacion_id?: number;
  consultorio_id?: number;
  estadia?: string;
  total?: number;
  metodo_de_pago?: string;
}
