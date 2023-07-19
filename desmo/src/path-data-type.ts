import _ from 'lodash';
import { SwaggerParameter } from './interfaces/swagger.interface';
import { DesmoModelDataType } from './model-data-type';
import { format } from './utils/global.util';

export interface PathDataType {
  path?: string;
  definitionName?: string;
  summary: string;
  method?: string;
  moduleName?: string;
  description?: string;
  operationId: string;
  requestBodyModel: DesmoModelDataType;
  parameters?: SwaggerParameter[];
  responseModel?: DesmoModelDataType;
  tag?: string;
  mediaType?: string
}

interface Parameter {
  parameterArgs: string;
  parameterBody: string;
  inter: string;
}


interface MakeCode {
  parameter?: Parameter
  sendRequestBody?: boolean
}

let importStatement = `
                  import * as m from '../models';
                  import { customRequest } from '@/utils/httpFactory/custom-request';`;

export class DesmoPathDataType implements PathDataType {
  readonly path?: string;
  readonly definitionName?: string;
  readonly summary: string;
  readonly method?: string;
  readonly moduleName?: string;
  readonly description?: string;
  readonly operationId!: string;
  readonly requestBodyModel!: DesmoModelDataType;
  readonly parameters?: SwaggerParameter[];
  readonly responseModel?: DesmoModelDataType;
  readonly tag?: string;
  readonly mediaType?: string

  constructor(readonly dataType: PathDataType) {
    this.path = dataType.path;
    this.operationId = dataType.operationId;
    const { funcName } = this.makeFileInfo()
    this.definitionName = funcName;
    this.summary = dataType.summary;
    this.method = dataType.method;
    this.moduleName = dataType.moduleName;
    this.description = dataType.description;
    this.requestBodyModel = dataType.requestBodyModel;
    this.parameters = dataType.parameters;
    this.responseModel = dataType.responseModel;
    this.tag = dataType.tag;
    this.mediaType = dataType.mediaType;
  }

  makeRequest() {
    let { method } = this.dataType;
    let code = ""

    if (method === 'get') {
      code = this.makeGetRequest();
    }
    if (method === 'post') {
      code = this.makePostRequest();
    }
    if (method === 'patch') {
      code = this.makePatchRequest();
    }
    if (method === 'delete') {
      code = this.makeDeleteRequest();
    }
    return code;
  }
  /**
   * @description: 获取 req, res 类型声明 引用语句
   */
  getStatement() {
    let reqStatement = this.dataType.requestBodyModel.definitionName;
    reqStatement = reqStatement ? `m.${this.dataType.requestBodyModel.definitionName}` : "any";
    let resStatement = this.dataType.responseModel.definitionName;
    resStatement = resStatement ? `m.${this.dataType.responseModel.definitionName}` : "any";
    return { reqStatement, resStatement }
  }
  /**
   * @description: path 和 query 参数解析
   */
  makeParameters(parameterType: "query" | "path") {
    let newParameters = this.parameters.filter(e => parameterType === e.in)

    let inter = '';
    _.map(newParameters, (parameter) => {
      let { name, required, description, schema: { type } } = parameter;
      let newName = required ? name : `${name}?`;

      let item = `
                /**
                 * @description: ${description ?? ""}
                 */
                ${newName}: ${type};
                `;
      inter += item;
    })
    inter = `export interface ${_.upperFirst(parameterType)}Parameter { ${inter} };`;

    return inter
  }
  private makeQueryParameters() {
    let parameters = this.parameters.filter(e => e.in === "query")
    if (parameters.length > 0) {
      let queryInter = this.makeParameters("query")
      return { args: "query:QueryParameter", queryInter }
    }
    return null
  }
  private makePathParameters() {
    let parameters = this.parameters.filter(e => e.in === "path")
    if (parameters.length > 0) {
      let pathInter = this.makeParameters("path")
      return { args: "path:PathParameter", pathInter }
    }
    return null
  }
  private makeParameterArgs(): Parameter {
    let path = this.makePathParameters()
    let query = this.makeQueryParameters()
    let parameterArgs = ""
    let parameterBody = ""
    let inter = ""
    if (path !== null) {
      parameterArgs += path.args + ","
      parameterBody += "path:path,"
      inter += path.pathInter
    }
    if (query !== null) {
      parameterArgs += query.args + ","
      parameterBody += "query:query,"
      inter += query.queryInter
    }

    return { parameterArgs, parameterBody: parameterBody, inter }
  }
  private makeGetRequest() {
    let parameter = this.makeParameterArgs()
    let code = this.makeCode({ parameter, sendRequestBody: false })
    return code
  }
  private makePostRequest() {
    let code = this.makeCode({ sendRequestBody: true })
    return code
  }
  private makeDeleteRequest() {
    let parameter = this.makeParameterArgs()
    let code = this.makeCode({ parameter, sendRequestBody: false })
    return code
  }
  private makePatchRequest() {
    let parameter = this.makeParameterArgs()
    let code = this.makeCode({ parameter, sendRequestBody: true })
    return code
  }


  private makeCode(makeCode: MakeCode) {
    let { resStatement, reqStatement } = this.getStatement()
    let { parameterArgs = "", parameterBody = "", inter = "" } = makeCode.parameter ?? {}
    let sendRequestBody = makeCode.sendRequestBody

    let bodyArgs = reqStatement === "any" ? "requestBody?" : "requestBody"
    let requestBodyArgs = sendRequestBody ? `${bodyArgs}: ${reqStatement}` : ""
    let body = sendRequestBody ? `body: requestBody` : ""

    let funcName = this.definitionName;
    let comment = `/**
     * @description: ${this.tag} - ${this.summary ?? ""}
     */`
    let mediaType = this.dataType.mediaType !== "" ? `mediaType: '${this.dataType.mediaType}',` : ""

    let funcStatement = `
    export const ${funcName} =
    async function (${parameterArgs} ${requestBodyArgs}): Promise<${resStatement}> {
      return customRequest({
        url: '${this.dataType.path}',
        method: '${this.dataType.method}',
        ${mediaType}${parameterBody} ${body}
      })
    }`

    let code = [importStatement, inter, comment, funcStatement].join('')
    code = format(code);
    return code
  }
  makeFileInfo() {
    let { operationId } = this.dataType;
    operationId = operationId.replace('Controller', '');
    const funcName = _.camelCase(operationId);
    const filename = _.kebabCase(operationId);
    return { funcName, filename };
  }

}
