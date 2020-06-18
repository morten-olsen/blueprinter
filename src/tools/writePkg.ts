import mkjson from './mkjson';

const writePkg = mkjson({
  location: pkg => pkg.location,
  json: pkg => pkg.generate(),
});

export default writePkg;
