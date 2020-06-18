import Step from './Step';
import fs from 'fs-extra';
import path from 'path';
import Package from '../Package';

interface MkdirOptions {
  dir: ((pkg: Package) => string) | string;
}

const mkdir = ({
  dir,
}: MkdirOptions): Step => async (pkg) => {
  const realDir = typeof dir === 'string'
    ? path.resolve(pkg.directory, dir)
    : dir(pkg);
  await fs.mkdirp(realDir);
  return pkg;
}

export default mkdir;
