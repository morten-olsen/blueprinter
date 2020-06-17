const compose = (...functions: any[]) =>
(initialValue: any) =>
    functions.reduceRight(
      (sum, fn) => Promise.resolve(sum).then(fn),
      initialValue
    );

    export default compose;
