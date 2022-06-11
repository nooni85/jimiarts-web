import express, { Request, Response } from 'express';
import 'reflect-metadata';
import Container from 'typedi';
import { Config } from './config';

const app = express();

const config = Container.get(Config);
const configList = config.load();
console.log(configList);

app.use('/', (req: Request, res: Response) => {
	res.send('loadSyncDefault()');
});
