import _ from "lodash"
import { SwaggerReferenceObject, SwaggerSchemaObject, SwaggerType } from "./interfaces/swagger.interface"
import { DesmoStandardData } from "./standard"
import { format } from "./utils/global.util"

function transformModelName(name: string) {
  name = name.replace("Dto", "")
  let filename = _.kebabCase(name)
  let definitionName = name
  return { filename, definitionName }
}

export interface ModelDataType {
  name: string
  schema: SwaggerSchemaObject
  standardData: DesmoStandardData
}

export class DesmoModelDataType implements ModelDataType {
  readonly schema: SwaggerSchemaObject
  readonly properties: Record<string, SwaggerSchemaObject | SwaggerReferenceObject>;
  readonly standardData: DesmoStandardData


  readonly name: string
  readonly sourceName: string
  readonly filename: string
  readonly definitionName: string
  readonly code: string
  readonly importStatement: string
  readonly exportStatement: string
  private refModel: DesmoModelDataType[] = []

  constructor(modelDataType: ModelDataType) {
    this.schema = modelDataType.schema
    this.properties = modelDataType.schema.properties
    this.sourceName = modelDataType.name
    this.standardData = modelDataType.standardData

    const { filename, definitionName } = transformModelName(modelDataType.name)
    this.name = modelDataType.name
    this.filename = filename
    this.definitionName = definitionName
    this.code = this.codeGenerator()
    this.importStatement = this.getImportStatement()
    this.exportStatement = this.getExportStatement()
  }

  private codeGenerator() {
    let { required: required = [] } = this.schema;
    let s = '';
    _.map(this.properties, (schemaObject: SwaggerSchemaObject & SwaggerReferenceObject, key: string) => {
      const { description, type, items, default: defaultValue, $ref } = schemaObject;
      const isRequired = required.includes(key);
      key = isRequired ? key : `${key}?`;

      let kv = ""
      if ($ref) {
        let model = this.standardData.getModel($ref)
        this.refModel.push(model)
        kv = `${key}: ${model.definitionName};`

      } else if (type === SwaggerType.array) {

        const ref = (items as SwaggerReferenceObject)?.$ref
        if (ref) {
          let model = this.standardData.getModel(ref)
          this.refModel.push(model)
          kv = `${key}: Array<${model.definitionName}>;`
        } else {
          kv = `${key}: ${(items as SwaggerSchemaObject)?.type}[];`
        }

      } else {
        kv = `${key}: ${type};`
      }
      let newDefaultValue = defaultValue ? `default: ${defaultValue}` : ""
      let item = `
                /**
                 * @description: ${description ?? ""} ${newDefaultValue}
                 */
                ${kv}
                `;
      s += item;
    });
    let importStatement = ''
    this.refModel.map(model => {
      importStatement += `import { ${model.definitionName} } from './${model.filename}';`
    })
    let text = `${importStatement}export interface ${this.definitionName} { ${s} }`;
    text = format(text)
    return text;
  }

  getImportStatement() {
    let statement = `import { ${this.definitionName} } from '../models/${this.filename}';`
    return statement
  }
  getExportStatement() {
    const statement = `export * from './${this.filename}';\n`
    return statement
  }

}
