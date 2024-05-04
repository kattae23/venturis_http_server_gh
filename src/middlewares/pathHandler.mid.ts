import { Request, Response } from 'express';

function pathHandler(req: Request, res: Response) {
  return res.json({
    statusCode: 404,
    message: `${req.method} ${req.url} not found endpoint`,
  });
}

export default pathHandler;
