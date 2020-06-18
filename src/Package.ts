import path from 'path';
import fs from 'fs-extra';

class Package {
  name: string;
  isPrivate: boolean = true;
  location: string;
  version: string = '1.0.0';
  main: string = 'dist/index.js';
  bin: {[name: string]: string} = {};
  dependencies: {[name: string]: string} = {};
  devDependencies: {[name: string]: string} = {};
  peerDependencies: {[name: string]: string} = {};
  scripts: {[name: string]: string} = {};
  opts: {[name: string]: any} = {};

  constructor(name: string, location: string) {
    this.name = name;
    this.location = location;
  }

  get directory() {
    return path.dirname(this.location);
  }

  load = async () => {
    if (!fs.existsSync(this.location)) {
      return;
    }
    const {
      name,
      private: isPrivate,
      version,
      main,
      bin,
      dependencies,
      devDependencies,
      peerDependencies,
      scripts,
      ...opts
    } = await fs.readJSON(this.location);
    this.name = name || this.name;
    this.isPrivate = isPrivate ?? this.isPrivate;
    this.version = version || this.version;
    this.main = main || this.main;
    this.bin = {
      ...this.bin,
      ...bin,
    };
    this.dependencies = {
      ...this.dependencies,
      ...dependencies,
    };
    this.devDependencies = {
      ...this.devDependencies,
      ...devDependencies,
    };
    this.peerDependencies = {
      ...this.peerDependencies,
      ...peerDependencies,
    };
    this.scripts = {
      ...this.scripts,
      scripts,
    };
    this.opts = {
      ...this.opts,
      ...opts,
    };
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
