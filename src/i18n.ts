import i18next from 'i18next';
import Backend from 'i18next-fs-backend';
import i18nextMiddleware, { LanguageDetector } from 'i18next-http-middleware';
import { join } from 'path';

const localesFolder = join(__dirname, '../locales');

i18next
	.use(Backend)
	.use(LanguageDetector)
	.init({
		// debug: true,
		initImmediate: false,
		backend: {
			loadPath: join(localesFolder, '{{lng}}/{{ns}}.json'),
			addPath: join(localesFolder, '{{lng}}/{{ns}}.missing.json'),
		},
	});

export { i18next, i18nextMiddleware };
