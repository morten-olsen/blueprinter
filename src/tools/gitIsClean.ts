import Step from './Step';
import simpleGit from 'simple-git';

const gitIsClean: Step = async (pkg) => {
  const git = simpleGit(pkg.directory);
  const status = await git.status();
  if (status.files.length > 0) {
    throw new Error('Git needs to be clean');
  }
  
  return pkg;
};

export default gitIsClean;
