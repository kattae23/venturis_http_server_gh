import { NextFunction, Request, Response } from 'express';
import { HttpsOptions } from '../utils/interfaces';
import fs from 'fs';

// development
const ACCEPTED_ORIGINS = [
  'http://localhost:3000',
  'http://localhost:8000',
  'http://localhost:8080',
  'http://192.168.1.2:8080',
  'https://192.168.1.1:8080',
];

export class Development {
  static dev(req: Request, res: Response, next: NextFunction) {
    try {
      const origin = req.headers.origin;
      if (!origin) throw new Error('Please use a compatible browser ');
      if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
        res.setHeader('Access-Control-Allow-Origin', origin || '*');
        res.setHeader(
          'Access-Control-Allow-Methods',
          'GET, POST, PATCH, DELETE, OPTIONS',
        );
        res.setHeader(
          'Access-Control-Allow-Headers',
          'Content-Type, Authorization, Upgrade, Connection, Cookie, Set-Cookie',
        );
        res.setHeader('Access-Control-Allow-Credentials', 'true'); // Allow Credentials
        res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
        res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
      }
      next();
    } catch (error) {
      throw error;
    }
  }

  static certificates() {
    const certificateOptions = {
      privateKeyPath: '/home/armandodc/mkcert/localhost-key.pem',
      certificatePath: '/home/armandodc/mkcert/localhost.pem',
    };

    let privateKey: string;
    let certificate: string;
    let httpsOptions: HttpsOptions | undefined;

    const privateKeyExist = fs.existsSync(certificateOptions.privateKeyPath);
    const certificateExist = fs.existsSync(certificateOptions.certificatePath);

    if (privateKeyExist || certificateExist) {
      privateKey = fs.readFileSync(certificateOptions.privateKeyPath, 'utf8');
      certificate = fs.readFileSync(certificateOptions.certificatePath, 'utf8');
      httpsOptions = {
        key: privateKey,
        cert: certificate,
      };
    }

    return httpsOptions;
  }
}
