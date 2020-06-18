import InitStep from './InitStep';
import Package from '../Package';
import path from 'path';
import fs from 'fs-extra';
import compose from './compose';
import mkdir from './mkdir';

interface PkgOptions {
  merge?: boolean;
};

const pkg = ({
  merge = true,
}: PkgOptions) => (name: string): InitStep<string> => compose(
  async (directory: string) => {
    const location = path.join(directory, 'package.json');
    const nPkg = new Package(name, location);
    if (merge) {
      await nPkg.load();
    }
    return nPkg;
  },
  mkdir({ dir: '.' }),
);

export default pkg;
