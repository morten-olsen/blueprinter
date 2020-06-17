import Package from '../Package';
import path from 'path';
import fs from 'fs-extra';

interface TypescriptOptions {
  overrideVersion?: boolean;
}

const typescript = ({
  overrideVersion,
}: TypescriptOptions) => async (pkg: Package) => {
  if (!pkg.dependencies.typescript || overrideVersion) {
    pkg.dependencies.typescript = '^3.9.5';
  }

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
