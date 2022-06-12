import fs from 'fs';
import path from 'path';
import { Logger } from './logger';

export class Config {
	logger = Logger();

	/**
	 * determineEnv()
	 */
	protected determineEnv(): Env {
		switch(process.env.NODE_ENV) {
			case 'dev':
				return 'dev';
			case 'prod':
				return 'prod';
			case 'test':
				return 'test';
			default:
				return 'dev';
		}
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
		let result: ServerConfig = {};
		let configPath = this.determineProfilePath();
		let files = this.fetchConfigFiles();

		files.map((file) => {
			let fileFullPath = path.join(configPath, file);
			this.logger.debug(`Loading config file from : ${fileFullPath}`);

			const filePath:string = path.basename(fileFullPath).replace('.ts', '');

			result[filePath as keyof ServerConfig] = require(fileFullPath).default[filePath];

		});

		// Setup env
		if(!result.env?.profile) {
			result.env = {
				profile: this.determineEnv(),
				...result.env
			}
		}
		
		return result;
	}
}
