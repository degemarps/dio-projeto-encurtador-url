import { Request, Response } from 'express';
import shortid from 'shortid';
import { config } from '../config/constants';

export class urlControler {
  public async shorten(req: Request, res: Response): Promise<void> {
    // Se a URL já não existe
    // Criar o hash para essa URL
    const { originURL } = req.body;
    const hash = shortid.generate();
    const shortURL = `${config.API_URL}/${hash}`;
    // Salver a URL no banco
    // Retornar a URL que a gente salvou
    res.json({ originURL, hash, shortURL });
  }

  public async redirect(req: Request, res: Response): Promise<void> {
    // Pegar o hash da URL
    const { hash } = req.params;
    // Encontrar a URL original pelo hash
    const url = {
      originURL: 'https://cloud.mongodb.com/v2/61c9d3efe6a6c6191220c8d2#clusters/connect?clusterId=encurtador-url-dio',
      hash: '5fFQ57mWU',
      shortURL: 'http://localhost:4000/5fFQ57mWU',
    };
    // Redirecionar para a URL original a partir do que encontramos no DB
    res.redirect(url.originURL);
  }
}