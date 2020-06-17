import Step from './Step';
import Package from '../Package';
import fs from 'fs-extra';
import path from 'path';

interface CreatePackageOptions {
  owner?: string;
}

const createMonoRepoPackage = ({
  owner,
}: CreatePackageOptions) => (name: string): Step => async (pkg: Package) => {
  const pkgName = owner ? `@${owner}/${name}` : name;
  const pkgLocation = path.join(pkg.directory, 'packages', name);
  const location = path.join(pkgLocation, 'package.json');
  await fs.mkdirp(pkgLocation);
  await fs.mkdirp(path.join(pkgLocation, 'src'));
  const nPkg = new Package(pkgName, location);
  nPkg.main = './dist/index.js';
  
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

    const nTsConfigLocation = path.join(nPkg.directory, 'tsconfig.json');

    if (!tsConfig.references) {
      tsConfig.references = [];
    }
    tsConfig.references.push({
      path: `./packages/${name}/tsconfig.json`,
    });

    await fs.writeFile(tsConfigLocation, JSON.stringify(tsConfig, null, '  '), 'utf-8');
    await fs.writeFile(nTsConfigLocation, JSON.stringify(nTsConfig, null, '  '), 'utf-8');
  }

  await fs.writeFile(location, JSON.stringify(nPkg.generate(), null, '  '), 'utf-8');

  return nPkg;
};

export default createMonoRepoPackage;
