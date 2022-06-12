import Container from 'typedi';
import { Config } from './config';


test('adds 1 + 2 to equal 3', () => {
  const config = Container.get(Config);
  const configResult = config.load();

});