import Step from './Step';
import Package from '../Package';
import fs from 'fs-extra';
import path from 'path';
import compose from './compose';
import createPackage from './pkg';
import mkdir from './mkdir';

interface CreatePackageOptions {
  owner?: string;
  merge?: boolean;
}

const createMonoRepoPackage = ({
  owner,
  merge,
}: CreatePackageOptions) => (name: string): Step => (orgPkg) => {

  const steps = compose(
    (pkg: Package) => createPackage({ merge })(name)(path.join(pkg.directory, 'packages', name)),
    mkdir({ dir: '.' }),
    mkdir({ dir: './src' }),

    async (pkg: Package) => {
      const tsConfigLocation = path.join(pkg.directory, 'tsconfig.json');
      if (fs.existsSync(tsConfigLocation)) {
        const tsConfig = await fs.readJSON(tsConfigLocation);
        const nTsConfig = {
          extends: '../../tsconfig.json',
          compilerOptions: {
            outDir: './dist',
          },
          include: [
            './src',
          ],
        };

        const nTsConfigLocation = path.join(pkg.directory, 'tsconfig.json');

        if (!tsConfig.references) {
          tsConfig.references = [];
        }
        tsConfig.references.push({
          path: `./packages/${name}/tsconfig.json`,
        });

        await fs.writeFile(tsConfigLocation, JSON.stringify(tsConfig, null, '  '), 'utf-8');
        await fs.writeFile(nTsConfigLocation, JSON.stringify(nTsConfig, null, '  '), 'utf-8');
      }

      await fs.writeFile(pkg.location, JSON.stringify(pkg.generate(), null, '  '), 'utf-8');

      return pkg;
    },
  );

  return steps(orgPkg);
};

export default createMonoRepoPackage;
