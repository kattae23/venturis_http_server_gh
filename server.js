import "dotenv/config.js";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import router from "./src/data/routers/index.router.js";
import morgan from "morgan";
import dbConnection from "./src/utils/mongodb.js";
import passport from "./src/middlewares/passport.mid.js";
import https from 'https';
import fs from 'fs';

// CONFIGURACIÓN INICIAL
const server = express();
const PORT = process.env.PORT || 8080;

server.get('/inicio', (req, res) => {
  res.send(`
      <html>
          <body>
              <a href="/juego" onclick="abrirJuego(); return false;">Haz clic aquí para iniciar el juego</a>

              <script>
                  function abrirJuego() {
                      window.open('/juego', '_blank', 'width=1920,height=1080');
                  }
              </script>
          </body>
      </html>
  `);
});

// Lee los archivos del certificado y la clave privada
const privateKey = fs.readFileSync('/home/armandodc/mkcert/localhost-key.pem', 'utf8');
const certificate = fs.readFileSync('/home/armandodc/mkcert/localhost.pem', 'utf8');

// Crea una opciones de HTTPS
const httpsOptions = {
  key: privateKey,
  cert: certificate
};

// development
const ACCEPTED_ORIGINS = [
  "http://localhost:3000",
  "http://localhost:8000",
  "http://localhost:8080",
  "http://192.168.1.2:8080",
  "https://192.168.1.1:8080"
];

// development
server.use((req, res, next) => {
  const origin = req.headers.origin;
  if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
    res.setHeader('Access-Control-Allow-Origin', origin || '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Upgrade, Connection, Cookie, Set-Cookie');
    res.setHeader('Access-Control-Allow-Credentials', 'true'); // Permitir las credenciales
    res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
    res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
  }
  next();
});

server.use('/juego', express.static("/mnt/c/Users/josea/OneDrive/Escritorio/Venturis/Godot/build"));
server.use(express.json());
server.use(cookieParser(process.env.SECRET_KEY));
server.use(morgan("dev")); // Only works for HTTP connections
server.use(passport.initialize());

// RUTAS
server.use("/", router);

// INICIALIZACIÓN DEL SERVIDOR
const ready = () => {
  console.log(`- HTTPS Server running - port: ${PORT}`);
  dbConnection();
};

// Crea un servidor HTTPS con las opciones y tu aplicación Express
const httpsServer = https.createServer(httpsOptions, server);

// Escucha en el puerto deseado
httpsServer.listen(PORT, '0.0.0.0', ready);