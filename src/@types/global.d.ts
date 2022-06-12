declare global {

  type Env = 'prod' | 'dev' | 'test';
  
  /**
   * Server Config
   */
  type ServerConfig = {
    database?: {
      username?: string
      password?: string
      host?: string
    },
    env?: {
      profile?: Env
      port?: number
    }
  };
}


export {} 