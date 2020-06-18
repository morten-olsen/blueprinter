import Step from './Step';
import http from 'http';
import fs from 'fs';

interface DownloadOptions {
  url: string;
  location: string;
}

const download = ({
  url,
  location,
}: DownloadOptions): Step => (pkg) => new Promise((resolve, reject) => {
  const writer = fs.createWriteStream(location);
  writer.on('finish', () => {
    resolve(pkg);
  });
  const req = http.get(url, (res) => {
    res.pipe(writer);
  });
  req.on('error', reject);
});

export default download;



