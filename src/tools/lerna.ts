import fs from 'fs-extra';
import path from 'path';
import Step from './Step';

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
}: LernaOptions): Step => async (pkg) => {
  if (!pkg.devDependencies.lerna || overrideVersion) {
    pkg.devDependencies.lerna = '^3.22.1';
  }

  if (!pkg.opts.workspaces || overrideWorkspaces) {
    pkg.opts.workspaces = workspaces;
    await fs.mkdirp(path.join(pkg.directory, 'packages'));
  }

  pkg.isPrivate = true;
  pkg.scripts.postinstall = 'lerna bootstrap';

  const lernaLocation = path.join(pkg.directory, 'lerna.json');
  const lernaConfig: any = {
    useWorkspaces: true,
    npmClient: 'yarn',
    version: '1.0.0',
  };
  if (publishUrl) {
    if (!lernaConfig.command) {
      lernaConfig.command = {};
    }
    lernaConfig.command.publish = {
      registry: publishUrl,
    };
  }

  if (!fs.existsSync(lernaConfig)) {
    await fs.writeFile(lernaLocation, JSON.stringify(lernaConfig, null, '  '));
  }

  return pkg;
};

export default lerna;
