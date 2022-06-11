import fs from 'fs';
import path from 'path';
import { Service } from 'typedi';
import winston from 'winston';
import { Logger } from './logger';
import { Type } from 'jimiarts';

@Service()
export class Config {
	constructor(@Logger() private logger: winston.Logger) {}

	/**
	 * determineEnv()
	 */
	protected determineEnv(): string {
		return process.env.NODE_ENV ? process.env.NODE_ENV : 'dev';
	}

	protected determineProfilePath(): string {
		const profile = this.determineEnv();
		return path.join(__dirname, '../config', profile);
	}

	protected fetchConfigFiles() {
		let configPath = this.determineProfilePath();
		this.logger.debug(`Loading config directory from : ${configPath}`);

		return fs.readdirSync(configPath);
	}

	public load() {
		let result: Type.Config = [{}];
		let configPath = this.determineProfilePath();
		let files = this.fetchConfigFiles();

		files.map((file) => {
			let fileFullPath = path.join(configPath, file);
			this.logger.debug(`Loading config file from : ${fileFullPath}`);

			result.push(require(fileFullPath));
		})

		return result;
	}
}

// function config(env: string, @Logger() logger: winston.Logger ) {
// 	const configPath = path.join(__dirname, '../config', env, '*');
// 	logger.debug('Loading config files from : ', configPath);

// 	// const files = fs.readdirSync();
// 	// console.log(files);
// 	return [];
// }

// // let config = [];
// // let resolveConfigPath =``
// // console.log(resolveConfigPath);

// // fs.readFileSync('../config')

// export default config;
