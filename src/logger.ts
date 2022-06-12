import winston from 'winston';
import WinstonDaily from 'winston-daily-rotate-file';
import path from 'path';

// logs 디렉토리 하위에 로그 파일 저장
const logDir = 'logs';
const { combine, timestamp, printf } = winston.format;

// Define log format
const logFormat = printf((info) => {
	return `${info.timestamp} ${info.level}: ${info.message}`;
});

function Logger(): winston.Logger {
	const logger = winston.createLogger({
		format: combine(
			timestamp({
				format: 'YYYY-MM-DD HH:mm:ss',
			}),
			logFormat,
		),
		transports: [
			// info 레벨 로그를 저장할 파일 설정
			new WinstonDaily({
				level: 'info',
				datePattern: 'YYYY-MM-DD',
				dirname: logDir,
				filename: `%DATE%.log`,
				maxFiles: 30,
				zippedArchive: true,
			}),
			// error 레벨 로그를 저장할 파일 설정
			new WinstonDaily({
				level: 'error',
				datePattern: 'YYYY-MM-DD',
				dirname: path.join(logDir, '/error'),
				filename: `%DATE%.error.log`,
				maxFiles: 30,
				zippedArchive: true,
			}),
		],
	});

	// Production 환경이 아닌 경우(dev 등)
	if (process.env.NODE_ENV !== 'production') {
		logger.add(
			new winston.transports.Console({
				format: winston.format.combine(
					winston.format.colorize(),
					timestamp({
						format: 'YYYY-MM-DD HH:mm:ss',
					}),
					logFormat,
				),
			}),
		);
	}

	return logger;
}

export default Logger;
