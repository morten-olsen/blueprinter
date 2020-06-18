import fs from 'fs-extra';
import path from 'path';
import Step from './Step';
import compose from './compose';
import addDevDependencies from './addDevDependencies';
import mkjson from './mkjson';

interface LernaOptions {
  overrideVersion?: boolean;
  overrideWorkspaces?: boolean;
  workspaces?: string[];
  publishUrl?: string;
}

const lerna = ({
  overrideVersion,
  overrideWorkspaces,
  workspaces = ['packages/*'],
  publishUrl,
}: LernaOptions): Step => compose(
  addDevDependencies({
    lerna: '^3.22.1',
  }),
  mkjson({
    location: './lerna.json',
    json: {
      useWorkspaces: true,
      npmClient: 'yarn',
      version: '1.0.0',
      command: publishUrl ? {
        publish: {
          registry: publishUrl,
        },
      } : undefined,
    },
  }),
  async (pkg) => {
    if (!pkg.opts.workspaces || overrideWorkspaces) {
      pkg.opts.workspaces = workspaces;
      await fs.mkdirp(path.join(pkg.directory, 'packages'));
    }
    pkg.isPrivate = true;
    pkg.scripts.postinstall = 'lerna bootstrap';

    return pkg;
  },
);

export default lerna;
