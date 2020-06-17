import path from 'path';

class Package {
  name: string;
  isPrivate: boolean = true;
  location: string;
  version: string = '1.0.0';
  main: string = 'dist/index.js';
  bin: {[name: string]: string} = {};
  dependencies: {[name: string]: string} = {};
  devDependencies: {[name: string]: string} = {};
  scripts: {[name: string]: string} = {};
  opts: {[name: string]: any} = {};

  constructor(name: string, location: string) {
    this.name = name;
    this.location = location;
  }

  get directory() {
    return path.dirname(this.location);
  }

  generate = () => ({
    name: this.name,
    private: this.isPrivate,
    version: this.version,
    main: this.main,
    bin: this.bin,
    dependencies: this.dependencies,
    devDependencies: this.devDependencies,
    scripts: this.scripts,
    ...this.opts,
  });
}

export default Package;
