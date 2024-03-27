import { Request, Response } from 'express';
import { HabitacionModel } from '../../models/habitacion';

export class Controller {
  get = async (req: Request, res: Response) => {
    const habitaciones = await HabitacionModel().findAll();

    res.json({
      ok: true,
      habitaciones,
    });
  };
}
