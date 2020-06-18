import mkfile from './mkfile';
import Step from './Step';
import Package from '../Package';

interface MkjsonOptions {
  json: ((pkg: Package) => any) | object | Array<any>;
  location: ((pkg: Package) => string) | string;
}

const mkjson = ({
  json,
  location,
}: MkjsonOptions): Step => mkfile({
  location,
  content: pkg => JSON.stringify(typeof json === 'function' ? json(pkg) : json, null, '  '),
});

export default mkjson;
