import simpleGit from 'simple-git';
import Step from './Step';

const git: Step = async (pkg) => {
  const git = simpleGit(pkg.directory);
  const isRepo = await git.checkIsRepo();
  if (isRepo.toString() === 'false') {
    await git.init(false);
  }

  return pkg;
}

export default git;
