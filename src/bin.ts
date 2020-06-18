import * as tools from './tools';
import path from 'path';

const run = async () => {
  const location = process.argv[2];
  const script = require(path.resolve(location));
  await script(tools);
};

run().catch(console.error);
