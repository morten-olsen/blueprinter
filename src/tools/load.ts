import Step from './Step';

interface LoadOptions {
  script: string;
}

const load = ({
  script,
}: LoadOptions): Step => async (pkg) => {
  const scriptLocation = require.resolve(script);
  const fn = require(scriptLocation);
  const m = fn.default || fn;
  const nPkg = m(pkg);
  return nPkg;
}

export default load;
