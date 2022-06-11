import winston from 'winston';
import path from 'path';
import Container, { ContainerInstance, Service } from 'typedi';

export function Logger() {
	return function(object: any, propertyName: string, index?: number) {
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

		Container.registerHandler({ object, propertyName, index, value: ContainerInstance => logger });
	}
}
