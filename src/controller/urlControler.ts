import { URLModel } from 'database/model/URL';
import { Request, response, Response } from 'express';
import shortid from 'shortid';
import { config } from '../config/constants';

export class urlControler {
  public async shorten(req: Request, res: Response): Promise<void> {
    // Se a URL já não existe
    const { originURL } = req.body;
    const url = await URLModel.findOne({ originURL });
    if (url) {
      res.json(url);
      return;
    }
    // Criar o hash para essa URL
    const hash = shortid.generate();
    const shortURL = `${config.API_URL}/${hash}`;
    // Salver a URL no banco
    const newURL = await URLModel.create({ hash, shortURL, originURL });
    // Retornar a URL que a gente salvou
    res.json({ originURL, hash, shortURL });
  }

  public async redirect(req: Request, res: Response): Promise<void> {
    // Pegar o hash da URL
    const { hash } = req.params;
    // Encontrar a URL original pelo hash
    const url = await URLModel.findOne({ hash });
    
    if (url) {
      response.redirect(url.originURL);
      return;
    }
    res.status(400).json({ error: 'URL nor found' });
  }
}