import Step from './Step';

interface SetScriptOptions {
  name: string;
  script: string;
}

const setScript = ({
  name,
  script,
}: SetScriptOptions): Step => async (pkg) => {
  pkg.scripts[name] = script;
  return pkg;
};

export default setScript;
