import { Request, Response } from 'express';

export class Controller {
  get = (req: Request, res: Response) => {
    res.json({
      ok: true,
      msg: 'Get Users',
    });
  };
  post = (req: Request, res: Response) => {
    res.json({
      ok: true,
      msg: 'Post Users',
    });
  };
}
