import Step from './Step';

const addDevDependencies = (deps: {[name: string]: string}): Step => async (pkg) => {
  pkg.dependencies = {
    ...pkg.dependencies,
    ...deps,
  };
  return pkg;
}

export default addDevDependencies;
