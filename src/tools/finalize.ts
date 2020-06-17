import fs from 'fs-extra';
import execa from 'execa';
import Package from '../Package';

const finalize = async (pkg: Package) => {
  await fs.writeFile(pkg.location, JSON.stringify(pkg.generate(), null, '  '));
  await execa('yarn', ['install'], {
    cwd: pkg.directory,
  });
}

export default finalize;
