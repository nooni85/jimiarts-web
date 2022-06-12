import http from 'http';
import express, { Request, Response } from 'express';
import 'reflect-metadata';
import ejs from 'ejs';
import { Config } from './config';

const app = express();
const server = http.createServer(app);
const config = new Config();

app.set('view engine', ejs);
app.set('views', './views');

app.use('/', (req: Request, res: Response) => {
	res.render('index.ejs');
});

console.log('listenin port: ', config.env?.port);
app.listen((config.env?.port ? 3000: config.env?.port));
