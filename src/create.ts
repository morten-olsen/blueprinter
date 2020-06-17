import * as tools from './tools';
import path from 'path';


const run = async () => {
  const location = path.join(process.cwd(), 'test');
  const createPackage = tools.createPackage({
    owner: 'yo',
  });
  const setup = tools.compose(
    tools.finalize,
    createPackage('foo'),
    createPackage('bar'),
    createPackage('baz'),
    tools.lerna({}),
    tools.jest({}),
    tools.typescript({}),
    tools.git,
    tools.pkg('test'),
  );

  const a = await setup(location);
};

run().catch(console.error);
