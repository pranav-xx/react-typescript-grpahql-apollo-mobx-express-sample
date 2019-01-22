const express = require('express');
const bodyParser = require('body-parser-json');
import { routes } from './routes';

const server = express();
server.use(bodyParser.json());

server.listen(3003, console.log('Trade Service is now up at port 3003'));

routes(server);
