import Package from '../Package';

type Step = (pkg: Package) => Promise<Package>;

export default Step;
