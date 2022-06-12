import express from 'express';
import ejs from 'ejs';
import * as dotenv from 'dotenv';
import { exit } from 'process';
import expressLayouts from 'express-ejs-layouts';
import Logger from './logger';
import router from './router';

/**
 * dotenv config
 * after this process.env.{value}
 */
dotenv.config();

const app = express();
const log = Logger();

/**
 * Check startup conditions...
 */
if (!process.env.PORT) {
	log.error(`PORT is not defined. please define PORT number on environment variable.`);
	exit();
}

/**
 * Register middlewares
 */
app.use(expressLayouts);
app.use('/', router);

/**
 * Setup middlewares..
 */
app.set('layout', 'layout');
app.set('layout extractScripts', true);
app.set('view engine', ejs);
app.set('views', './views');

log.info(`Listen port: ${process.env.PORT}`);
app.listen(process.env.PORT);
