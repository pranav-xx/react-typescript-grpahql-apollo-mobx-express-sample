const express = require('express');
const bodyParser = require('body-parser-json');
import { routes } from './routes';

const server = express();
server.use(bodyParser.json());

server.listen(3001, console.log('RefData Service is now up at port 3001'));

routes(server);
