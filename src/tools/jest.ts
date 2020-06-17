import Package from '../Package';

interface JestOptions {
  overrideVersion?: boolean;
}

const jest = async ({
  overrideVersion,
}: JestOptions) => async (pkg: Package) => {
  if (!pkg.devDependencies.jest || overrideVersion) {
    pkg.devDependencies.jest = '^26.0.1';
  }
  if (pkg.devDependencies.typescript) {
    if (!pkg.devDependencies['ts-jest'] || overrideVersion) {
      pkg.devDependencies['ts-jest'] = '^26.1.0';
    }
  }
  pkg.scripts.test = 'jest';

  return pkg;
};

export default jest;
