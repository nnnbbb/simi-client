import { writeFileSync } from 'fs';
import _ from 'lodash';
import { resolve } from 'path';

import { DesmoOptions } from './interfaces/options.interface';
import { DesmoStandardData } from './standard';
import { mkdir } from './utils/fileSystem';

export class DesmoCodeGenerator {
  readonly outputPathModels: string
  readonly options: DesmoOptions

  constructor(readonly desmoStandardData: DesmoStandardData, options: DesmoOptions) {
    this.outputPathModels = resolve(options.output, 'models');
    this.options = options
  }

  makeRequests() {
    const models = this.desmoStandardData.models;
    let modelExportStatement = ""
    _.map(models, (model) => {
      const { filename } = model
      const code = model.code
      modelExportStatement += model.exportStatement
      const finalFilePath = resolve(this.outputPathModels, `${filename}.ts`);
      writeFileSync(finalFilePath, code, 'utf-8');
    })
    const modelIndexPath = resolve(this.outputPathModels, `index.ts`);
    writeFileSync(modelIndexPath, modelExportStatement, 'utf-8');

    const desmoPathDataType = this.desmoStandardData.desmoPathDataType;
    _.map(desmoPathDataType, (dataType) => {
      const { moduleName } = dataType
      const modelPath = resolve(this.options.output, moduleName)
      mkdir(modelPath)
      const { filename } = dataType.makeFileInfo();
      const code = dataType.makeRequest()
      const finalFilePath = resolve(modelPath, `${filename}.service.ts`);
      writeFileSync(finalFilePath, code, 'utf-8');
    })

  }
}
