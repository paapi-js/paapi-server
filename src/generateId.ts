import {nanoid} from 'nanoid';
import config from './config';

export default async function generateId(): Promise<string> {
  return nanoid(config.id?.length ?? 21)
}
