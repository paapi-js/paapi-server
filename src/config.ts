import {parse} from 'yaml';
import * as fs from 'fs';

const userConfig = parse(fs.readFileSync('./paapi.config.yaml', 'utf8'))

const defaultConfig = {
  port: 1616,
  id: {
    mode: 'uid',
    length: 21,
  }
}
const config = Object.assign(defaultConfig, userConfig)
console.log("Server config is: \n", config)
export default config
