import Step from './Step';

interface JestOptions {
  overrideVersion?: boolean;
}

const jest = ({
  overrideVersion,
}: JestOptions):Step => async (pkg) => {
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
