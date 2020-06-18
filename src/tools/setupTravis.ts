import Step from './Step';
import path from 'path';
import fs from 'fs-extra';

interface SonarcloudOptions {
  projectKey: string;
}

const sonarcloud = ({
  projectKey,
}: SonarcloudOptions): Step => async (pkg) => {
  const values: {[name: string]: string} = {
    'project-key': projectKey,
  };

  const location = path.join(pkg.location, 'sonar-sdf');
  const content: string = Object.values(values).map(([key, value]) => `${key}=${value}`).join('\n');
  await fs.writeFile(location, content, 'utf-8');

  return pkg;
};

export default sonarcloud;

