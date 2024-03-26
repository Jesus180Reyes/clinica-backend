import { Model, DataTypes } from 'sequelize';
import { ConnectionDB } from '../db/conection/connection';
import { FacturaModel } from './factura';

type includes = 'factura';

export const ReporteModel = (include?: includes[]) => {
  const model = ConnectionDB.db.define<Model<IReporte>>(
    'reporte',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      id_factura: {
        type: DataTypes.INTEGER,
      },
    },
    {
      tableName: 'reporte',
    },
  );
  if (include && include.includes('factura')) {
    model.hasOne(FacturaModel(), {
      foreignKey: 'id',
      sourceKey: 'id_factura',
    });
  }

  return model;
};

export interface IReporte {
  id?: number;
  id_factura?: number;
}
