import path from 'path';
import Step from './Step';
import addDevDependencies from './addDevDependencies';
import mkjson from './mkjson';
import compose from './compose';
import setScript from './setScript';

interface TypescriptOptions {
  overrideVersion?: boolean;
}

const typescript = ({
  overrideVersion,
}: TypescriptOptions): Step => compose(
  mkjson({
    location: './tsconfig.json',
    json: {
      compilerOptions: {
        target: 'es2015',
        module: 'commonjs',
        strict: true,
        declaration: true,
        esModuleInterop: true,
        skipLibCheck: true,
        forceConsistentCasingInFileNames: true,  
      },
    },
  }),
  addDevDependencies({
    typescript: '^3.9.5',
  }),
  setScript({
    name: 'build',
    script: 'tsc --watch',
  }),
);

export default typescript;
