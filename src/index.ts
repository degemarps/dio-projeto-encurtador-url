import { MongoConnection } from './database/mongoConnection';
import express, { Request, Response } from 'express';
import { urlControler } from './controller/urlControler';

const api = express();
api.use(express.json());

const database = new MongoConnection();
database.connect();

const urlcontroler = new urlControler();

api.post('/shorten', urlcontroler.shorten);
api.get('/:hash', urlcontroler.redirect);

api.listen(4000, () => console.log('Express listening'));