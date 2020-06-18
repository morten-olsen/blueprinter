import Package from '../Package';
import Step from './Step';

type PassthroughStep = (pkg: Package) => Promise<any>;

const passthrough = (step: Step):PassthroughStep => async (pkg) => {
  await step(pkg);
  return pkg;
};

export default passthrough;
