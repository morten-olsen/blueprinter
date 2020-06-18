import Step from './Step';

const addDependencies = (name: string, version: string): Step => async (pkg) => {
  pkg.dependencies[name] = version;
  return pkg;
}

export default addDependencies;
