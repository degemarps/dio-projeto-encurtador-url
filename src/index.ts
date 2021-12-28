import express, { Request, Response } from 'express';
import { urlControler } from './controller/urlControler';

const api = express();
api.use(express.json());

const urlcontroler = new urlControler();

api.post('/shorten', urlcontroler.shorten);
api.get('/:hash', urlcontroler.redirect);

api.listen(4000, () => console.log('Express listening'));