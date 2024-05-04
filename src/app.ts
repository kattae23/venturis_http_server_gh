import envs from './config/envs';
import { Development } from './development';
import { AppRoutes } from './presentation/router';
import { Server } from './presentation/server';
import { HttpsOptions } from './utils/interfaces';

(() => {
  main(Development.certificates());
})();

async function main(httpsOptions: HttpsOptions | undefined) {
  const server = new Server({
    port: envs.PORT,
    public_path: envs.PUBLIC_PATH,
    routes: AppRoutes.routes,
    httpsOptions,
  });

  await server.start();
}
