import InitStep from './InitStep';
import Package from '../Package';
import path from 'path';
import fs from 'fs-extra';

const pkg = (name: string): InitStep<string> => async (directory: string) => {
  const location = path.join(directory, 'package.json');
  const nPkg = new Package(name, location);
  await fs.mkdirp(directory);
  return nPkg;
};

export default pkg;
