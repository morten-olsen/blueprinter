import Step from './Step';
import execa from 'execa';

interface ScriptOptions {
  env?: {[name: string]: string | undefined};
  cwd?: string;
  command: string;
  args?: string[];
  hideOutput?: boolean;
}

const script = ({
  env = process.env || {},
  cwd: orgCwd,
  command,
  args = [],
    hideOutput,
}: ScriptOptions): Step => async (pkg) => {
  const cwd = orgCwd || pkg.directory;
  const nProcess = execa(command, args, {
    cwd,
    env,
  });
  if (!hideOutput) {
    nProcess.stdout?.pipe(process.stdout! as any);
  }
  await nProcess;
  return pkg;
};

export default script;
