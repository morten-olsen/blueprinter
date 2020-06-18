import Step from './Step';
import path from 'path';
import compose from './compose';
import mkdir from './mkdir';
import mkfile from './mkfile';

interface AddBinOptions {
  name: string;
  script: string;
}

const addBin = ({
  name,
  script,
}: AddBinOptions): Step => compose(
  mkdir({
    dir: (pkg) => path.join(pkg.directory, 'bin'),
  }),
  mkfile({
    location: pkg => path.join(pkg.directory, 'bin', `${name}.js`),
    content: () => `#!/usr/bin/env node\nrequire("${script}");`,
  }),
  async (pkg) => {
    pkg.bin[name] = `bin/${name}.js`;
    return pkg;
  },
);

export default addBin;
