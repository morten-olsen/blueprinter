import Step from './Step';
import fs from 'fs-extra';
import path from 'path';

const gitingnore: Step = async (pkg) => {
  const lines = [];
  lines.push('/node_modules');
  if (pkg.devDependencies.lerna) {
    lines.push('/packages/*/node_modules');
    if (pkg.devDependencies.typescript) {
      lines.push('/packages/*/dist');
    }
  }

  const location = path.join(pkg.directory, '.gitignore');
  await fs.writeFile(location, lines.join('\n'), 'utf-8');
  return pkg;
};

export default gitingnore;
