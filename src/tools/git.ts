import Package from '../Package';
import simpleGit from 'simple-git';

const git = async (pkg: Package) => {
  const git = simpleGit(pkg.directory);
  const isRepo = await git.checkIsRepo();
  if (isRepo.toString() === 'false') {
    await git.init(false);
  }

  return pkg;
}

export default git;
