import fs from 'fs-extra';
import execa from 'execa';
import Step from './Step';

const finalize: Step = async (pkg) => {
  await fs.writeFile(pkg.location, JSON.stringify(pkg.generate(), null, '  '));
  await execa('yarn', ['install'], {
    cwd: pkg.directory,
  });

  return pkg;
}

export default finalize;
