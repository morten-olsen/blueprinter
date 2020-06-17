import Package from '../Package';
import path from 'path';
import fs from 'fs-extra';
import Step from './Step';

interface TypescriptOptions {
  overrideVersion?: boolean;
}

const typescript = ({
  overrideVersion,
}: TypescriptOptions): Step => async (pkg) => {
  if (!pkg.devDependencies.typescript || overrideVersion) {
    pkg.devDependencies.typescript = '^3.9.5';
  }

  pkg.scripts.build = 'tsc --build';

  const config = {
    compilerOptions: {
      target: 'es2015',
      module: 'commonjs',
      strict: true,
      declaration: true,
      esModuleInterop: true,
      skipLibCheck: true,
      forceConsistentCasingInFileNames: true,  
    },
  };

  await fs.writeFile(path.join(pkg.directory, 'tsconfig.json'), JSON.stringify(config, null, '  '));
  
  return pkg;
};

export default typescript;
