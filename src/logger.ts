import winston from 'winston';
import path from 'path';

export function Logger(): winston.Logger {
	const logger = winston.createLogger({
		level: 'info',
		format: winston.format.json()
	});

	if (process.env.NODE_ENV !== 'production') {
		logger.level = 'debug';
		logger.add(
			new winston.transports.Console({
				format: winston.format.simple(),
			}),
		);
	} else {
		logger.add(
			new winston.transports.File({ filename: path.join(__dirname, 'log', 'error.log'), level: 'error' }),
		);
		logger.add(new winston.transports.File({ filename: path.join(__dirname, 'log', 'all.log') }));
	}

	return logger;
}
