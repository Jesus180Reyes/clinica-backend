import express, { Application } from 'express';
import cors from 'cors';
import user from '../routes/user/user.routes';
import consultorio from '../routes/consultorio/consultorio.routes';
import departamento from '../routes/departamento/departamento.routes';
import factura from '../routes/factura/factura.routes';
import habitacion from '../routes/habitacion/habitacion.routes';
import historialMedico from '../routes/historial_medico/historial_medico.routes';
import observacion from '../routes/observacion/observacion.routes';
import profesion from '../routes/profesiones/profesiones.routes';
import reporte from '../routes/reporte/reporte.routes';
import roles from '../routes/roles_trabajadores/roles_trabajadores.routes';
import signosVitales from '../routes/signos_vitales/signos-vitales.routes';
import tipoSangre from '../routes/tipo_sangre/tipo-sangre.routes';
import trabajadores from '../routes/trabajadores/trabajadores.routes';
import examenes from '../routes/examenes/examenes.routes';
import auth from '../routes/auth/auth.routes';
import { ConnectionDB } from '../db/conection/connection';
import chalk from 'chalk';
import moment from 'moment';
import multer from 'multer';
export class Server {
  public paths = {
    user: '/api/user',
    consultorio: '/api/consultorio',
    departamento: '/api/departamento',
    factura: '/api/factura',
    habitacion: '/api/habitacion',
    historialMedico: '/api/historial-medico',
    observacion: '/api/observacion',
    profesion: '/api/profesion',
    reporte: '/api/reporte',
    role: '/api/roles',
    signosVitales: '/api/signos-vitales',
    tipoSangre: '/api/tipoSangre',
    trabajadores: '/api/trabajadores',
    examenes: '/api/examenes',
    auth: '/api/auth',
  };
  public app: Application;
  public port: string;

  constructor() {
    this.app = express();
    this.port = process.env.PORT || '8080';

    // Conectar a base de datos
    this.conectarDB();

    // Middlewares
    this.middlewares();

    // Rutas de mi aplicación
    this.routes();
  }

  async conectarDB() {
    try {
      await ConnectionDB.db.authenticate();
      console.log(
        chalk.greenBright(
          'Conectado a la BD!!',
          ConnectionDB.db.getDatabaseName(),
        ),
      );
    } catch (error) {
      console.log(chalk.red('Hable con el administrador:: ', error));
    }
  }

  middlewares() {
    // CORS
    this.app.use(cors());

    // Lectura y parseo del body
    this.app.use(express.json());
    this.app.use(express.urlencoded({extended: true}))
    const storage = multer.memoryStorage();
   const upload =  multer({storage: storage});
    this.app.use(upload.any());
    // Directorio Público
    this.app.use(express.static('./src/public'));
    this.app.use(express.static('./src/templates'));
  }

  routes() {
    this.app.use(this.paths.user, user);
    this.app.use(this.paths.consultorio, consultorio);
    this.app.use(this.paths.departamento, departamento);
    this.app.use(this.paths.factura, factura);
    this.app.use(this.paths.habitacion, habitacion);
    this.app.use(this.paths.historialMedico, historialMedico);
    this.app.use(this.paths.observacion, observacion);
    this.app.use(this.paths.profesion, profesion);
    this.app.use(this.paths.reporte, reporte);
    this.app.use(this.paths.role, roles);
    this.app.use(this.paths.signosVitales, signosVitales);
    this.app.use(this.paths.tipoSangre, tipoSangre);
    this.app.use(this.paths.trabajadores, trabajadores);
    this.app.use(this.paths.examenes, examenes);
    this.app.use(this.paths.auth, auth);
  }

  listen() {
    const log = console.log;
    this.app.listen(this.port, () => {
      log(
        `${chalk.greenBright(moment().format('D/MM/YYYY h:mm a'))} : ${chalk.green('Servidor corriendo en puerto')}`,
        chalk.green(this.port),
      );
    });
  }
}
