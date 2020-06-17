import Package from '../Package';

type InitStep<T> = (init: T) => Promise<Package>;

export default InitStep;
