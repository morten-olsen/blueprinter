import * as tools from './tools';
import path from 'path';


const run = async () => {
  const location = path.join(process.cwd(), 'test');
  const createPackage = tools.createMonoRepoPackage({
    owner: 'yo',
  });
  const setup = tools.compose(
    tools.pkg('test'),
    tools.git,
    tools.typescript({}),
    tools.jest({}),
    tools.lerna({}),
    tools.passthrough(
      createPackage('baz'),
    ),
    tools.passthrough(
      createPackage('bar'),
    ),
    tools.passthrough(
      createPackage('foo'),
    ),
    tools.gitignore,
    tools.finalize,
  );

  await setup(location);
};

run().catch(console.error);
