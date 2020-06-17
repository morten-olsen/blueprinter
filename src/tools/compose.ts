import Step from './Step';
import InitStep from './InitStep';

const compose = <T> (init: InitStep<T>, ...functions: Step[]) => (initialValue: T) => (
  [init, ...functions].reduce(
     (sum: any, fn) => Promise.resolve(sum).then(fn),
    initialValue
  )
);

export default compose;
