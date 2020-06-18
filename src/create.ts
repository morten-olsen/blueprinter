import * as tools from './tools';
import path from 'path';


const run = async () => {
  const location = path.resolve('../test');
  const createPackage = tools.createMonoRepoPackage({
    owner: 'yo',
  });
  const pkg = tools.pkg({});
  const setup = tools.compose(
    pkg('test'),
    tools.git,
    tools.gitIsClean,
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
    tools.writePkg,
    tools.install,
  );

  await setup(location);
};

run().catch(console.error);
