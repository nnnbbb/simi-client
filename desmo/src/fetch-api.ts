import { writeFileSync } from 'fs';
import fetch from 'node-fetch';
import os from 'os';
import path, { resolve } from 'path';
import { DesmoCodeGenerator } from './code-generator';
import { DesmoOptions } from './interfaces/options.interface';
import { SwaggerDataSource } from './interfaces/swagger.interface';
import { DesmoStandardData } from './standard';
import { mkdir, rmdir } from './utils/fileSystem';
import log from './utils/log.util';
os.EOL

const host = 'http://192.168.29.196:6001';
console.log = log;

async function fetchApi() {
  const r = await fetch(`${host}/api-json`, {
    method: 'get',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
  const res: any = await r.json();
  writeFileSync(path.join(__dirname, 'api.json'), JSON.stringify(res, null, 2), 'utf-8');
  return res;
}

if (require.main === module) {
  (async () => {
    const options: DesmoOptions = {
      output: "src/services"
    }
    await rmdir(options.output)

    const outputPath = resolve(process.cwd(), options.output);
    const outputPathCore = resolve(outputPath, 'core');
    const outputPathModels = resolve(outputPath, 'models');
    mkdir(outputPathModels)

    let res: SwaggerDataSource = await fetchApi();

    const desmoStandard = new DesmoStandardData(res, options);
    desmoStandard.createDataType();

    let generator = new DesmoCodeGenerator(desmoStandard, options);
    generator.makeRequests()
  })();
}
