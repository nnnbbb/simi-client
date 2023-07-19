import _ from 'lodash';
import { DesmoOptions } from './interfaces/options.interface';
import {
  SwaggerDataSource,
  SwaggerOperationObject,
  SwaggerPathsObject,
  SwaggerSchemaObject,
  SwaggerSchemas
} from './interfaces/swagger.interface';
import { DesmoModelDataType } from './model-data-type';
import { DesmoPathDataType, PathDataType } from './path-data-type';
import { getContent } from './utils/getContent';
import { getOperationResponses } from './utils/getOperationResponses';

export class DesmoStandardData {
  readonly openApiPaths: SwaggerPathsObject;
  readonly openApiSchemas: SwaggerSchemas;
  readonly desmoPathDataType: DesmoPathDataType[] = [];
  readonly options: DesmoOptions;
  readonly models: Record<string, DesmoModelDataType> = {}
  readonly swaggerDataSource: SwaggerDataSource

  constructor(swaggerDataSource: SwaggerDataSource, options: DesmoOptions) {
    this.swaggerDataSource = swaggerDataSource;
    this.openApiPaths = swaggerDataSource.paths;
    this.openApiSchemas = swaggerDataSource.components.schemas;
    this.options = options;
    this.makeModel()
  }

  makeModel() {
    _.map(this.openApiSchemas, (schema: SwaggerSchemaObject, name: string) => {
      let model = new DesmoModelDataType({ name, schema, standardData: this })
      this.models[name] = model
    })
  }

  /**
   * @description 生成标准 dataType
   */
  createDataType() {
    _.map(this.openApiPaths, (openApiPath, path: string) => {
      const moduleName = path.split('/')[2] || '';
      path = path.replace('/api', '');
      _.map(openApiPath, (openApiPath, method: string) => {
        let tag = openApiPath?.tags && openApiPath?.tags[0] || openApiPath.operationId

        let post = this.makeDataType(openApiPath);
        let dataType = new DesmoPathDataType({ ...post, path, method, moduleName, tag });
        this.desmoPathDataType.push(dataType);

      });
    });
  }

  /**
   * @description Make DataType
   * @param openApiPath
   */
  makeDataType(openApiPath: SwaggerOperationObject) {
    const { mediaType, schema: { $ref: bodySchemaRef } } = getContent(openApiPath.requestBody?.content ?? {})
    const requestBodyModel = this.getModel(bodySchemaRef);

    const { type } = getOperationResponses(this.swaggerDataSource, openApiPath.responses)[0]
    const responseModel = this.getModel(type, false);

    const dataType: PathDataType = {
      definitionName: '',
      summary: openApiPath.summary,
      operationId: openApiPath.operationId,
      description: '',
      requestBodyModel,
      parameters: openApiPath.parameters,
      responseModel,
      mediaType,
    };
    return dataType;
  }
  /**
   * @description 获取 model
   * @param openApiPath
   * @param key
   */
  getModel(key: string, isRef = true): DesmoModelDataType {
    // let schemaKey: string = _.get(openApiPath, ref, '');
    if (isRef) {
      key = key.split('/').pop() ?? '';
    }
    const model: DesmoModelDataType = this.models[key] || {} as DesmoModelDataType;
    return model
  }
}
