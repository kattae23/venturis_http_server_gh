import cookieParser from 'cookie-parser';
import 'dotenv/config';
import express, { Router, Express } from 'express';
import path from 'path';
import https from 'https';
import dbConnection from '../data/mongo-db';
import envs from '../config/envs';
import { Development } from '../development';
import { HttpsOptions, Options } from '../utils/interfaces';
import cors from 'cors';
import morgan from 'morgan';

export class Server {
  private app = express();
  private readonly port: number;
  private readonly publicPath: string;
  private readonly routes: Router;
  private readonly httpsOptions?: HttpsOptions;

  constructor(options: Options) {
    const { port, routes, public_path = 'public', httpsOptions } = options;
    this.port = port;
    this.publicPath = public_path;
    this.httpsOptions = httpsOptions;
    this.routes = routes;
  }

  async start() {
    //* Middlewares
    this.app.use(express.json()); // raw
    this.app.use(express.urlencoded({ extended: true })); // x-www-form-urlencoded

    //* Public Folder
    this.app.use(express.static(this.publicPath));

    //* For development purposes
    if (!envs.PROD) this.app.use(Development.dev);

    // CORS
    this.app.use(cors({ origin: '*' }));

    this.app.use(morgan('dev'));

    this.app.use(cookieParser(process.env.SECRET_KEY));

    //* Routes
    this.app.use(this.routes);

    //* Static Page
    this.app.get('*', (req, res) => {
      const indexPath = path.join(
        __dirname + `../../../${this.publicPath}/index.html`,
      );
      res.sendFile(indexPath);
    });

    this.httpServer((this.httpsOptions as HttpsOptions) || {}, this.app);
  }

  async httpServer(httpsOptions: HttpsOptions, server: Express) {
    const httpServer = https.createServer(httpsOptions, server);
    this.listen(httpServer);
  }

  ready() {
    dbConnection();
    console.log(`- HTTPS Server running - port: ${this.port}`);
  }

  listen(server: https.Server) {
    server.listen(this.port, '0.0.0.0', () => this.ready());
  }
}
