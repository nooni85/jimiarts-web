import express from 'express';
import * as dotenv from 'dotenv';
import { exit } from 'process';
import expressLayouts from 'express-ejs-layouts';
import path from 'path';
import bodyParser from 'body-parser';
import i18next from 'i18next';
import i18nextMiddleware from 'i18next-http-middleware';
import { lstatSync, readdirSync } from 'fs';

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
 * Register middleware
 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const localesFolder = path.join(__dirname, '..', 'locales');
i18next.use(i18nextMiddleware.LanguageDetector).init({
	preload: readdirSync(localesFolder).filter((fileName) => {
		const joinedPath = path.join(localesFolder, fileName);
		return lstatSync(joinedPath).isDirectory();
	}),
	backend: {
		loadPath: path.join(localesFolder, '{{lng}}', '{{ns}}.json'),
	},
});

app.use(i18nextMiddleware.handle(i18next));
app.set('view engine', 'ejs');
app.use(expressLayouts);

app.set('views', './views');
app.set('layout', 'layout');
app.set('layout extractScripts', true);

app.use(express.static(path.join(__dirname, 'public')));

/**
 * Setup router
 */
app.use('/', router);

app.listen(process.env.PORT, () => log.info(`Listen port: ${process.env.PORT}`));
