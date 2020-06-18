import Step from './Step';
import Package from '../Package';
import fs from 'fs-extra';
import path from 'path';

interface MkfileOptions {
  location: ((pkg: Package) => string) | string;
  content: ((pkg: Package) => string) | string;
}

const mkfile = ({
  location,
  content,
}: MkfileOptions): Step => async (pkg) => {
  const realLocation = typeof location === 'string'
    ? path.resolve(pkg.directory, location)
    : location(pkg);

  const realContent = typeof content === 'string'
    ? content
    : content(pkg);
  await fs.writeFile(realLocation, realContent, 'utf-8');
  return pkg;
}

export default mkfile;
