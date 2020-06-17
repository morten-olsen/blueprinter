import Step from './Step';

const passthrough = (step: Step):Step => async (pkg) => {
  await step(pkg);
  return pkg;
};

export default passthrough;
