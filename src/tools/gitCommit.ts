import Step from './Step';
import simpleGit from 'simple-git';

interface GitCommitOptions {
  message: string;
}

const gitCommit = ({
  message,
}: GitCommitOptions): Step => async (pkg) => {
  const git = simpleGit(pkg.directory);
  const status = await git.status();
  if (status.files.length > 0) {
    const files = status.files.map(f => f.path);
    await git.commit(message, files);
  }
  
  return pkg;
};

export default gitCommit;
