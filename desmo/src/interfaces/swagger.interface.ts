export enum SwaggerType {
  integer = 'integer',
  string = 'string',
  file = 'string',
  array = 'array',
  number = 'number',
  boolean = 'boolean',
  object = 'object',
}

export interface SwaggerProperty {
  type: SwaggerType;
  enum?: string[];
  $ref?: string;
  description?: string;
  name: string;
  required: boolean;
}

export interface SwaggerSchemaProperty {
  type?: string;
  description?: string;
  default?: any;
  enum?: any[];
}

export interface SwaggerSchema {
  $ref: string;
  type?: SwaggerType;
  properties?: { [key in string]: SwaggerSchemaProperty };
  required?: string[];
}

export declare type SwaggerSchemas = Record<string, SwaggerSchemaObject | SwaggerReferenceObject>;

export interface SwaggerParameter {
  name: string;
  required: boolean;
  in: 'query' | 'body' | 'path';
  description: string;
  type: SwaggerType;
  enum: string[];
  schema: SwaggerSchema;
}
export declare type SwaggerContentObject = Record<
  string,
  SwaggerMediaTypeObject
>;

export interface ExampleObject {
  summary?: string;
  description?: string;
  value?: any;
  externalValue?: string;
}
export declare type ExamplesObject = Record<
  string,
  ExampleObject | SwaggerReferenceObject
>;
export declare type EncodingObject = Record<string, EncodingPropertyObject>;
export interface EncodingPropertyObject {
  contentType?: string;
  // headers?: Record<string, HeaderObject | SwaggerReferenceObject>;
  style?: string;
  explode?: boolean;
  allowReserved?: boolean;
}

export interface SwaggerMediaTypeObject {
  schema?: SwaggerSchemaObject | SwaggerReferenceObject;
  examples?: ExamplesObject;
  example?: any;
  encoding?: EncodingObject;
}

export interface SwaggerRequestBodyObject {
  description?: string;
  content: SwaggerContentObject;
  required?: boolean;
}
export declare type ParameterStyle =
  | 'matrix'
  | 'label'
  | 'form'
  | 'simple'
  | 'spaceDelimited'
  | 'pipeDelimited'
  | 'deepObject';

export declare type SwaggerLinksObject = Record<
  string,
  LinkObject | SwaggerReferenceObject
>;

export declare type LinkParametersObject = Record<string, any>;

export interface SwaggerSchemaObject {
  nullable?: boolean;
  // discriminator?: DiscriminatorObject;
  readOnly?: boolean;
  writeOnly?: boolean;
  // xml?: XmlObject;
  // externalDocs?: ExternalDocumentationObject;
  example?: any;
  examples?: any[] | Record<string, any>;
  deprecated?: boolean;
  type?: string;
  allOf?: (SwaggerSchemaObject | SwaggerReferenceObject)[];
  oneOf?: (SwaggerSchemaObject | SwaggerReferenceObject)[];
  anyOf?: (SwaggerSchemaObject | SwaggerReferenceObject)[];
  not?: SwaggerSchemaObject | SwaggerReferenceObject;
  items?: SwaggerSchemaObject | SwaggerReferenceObject;
  properties?: Record<string, SwaggerSchemaObject | SwaggerReferenceObject>;
  additionalProperties?: SwaggerSchemaObject | SwaggerReferenceObject | boolean;
  patternProperties?: SwaggerSchemaObject | SwaggerReferenceObject | any;
  description?: string;
  format?: string;
  default?: any;
  title?: string;
  multipleOf?: number;
  maximum?: number;
  exclusiveMaximum?: boolean;
  minimum?: number;
  exclusiveMinimum?: boolean;
  maxLength?: number;
  minLength?: number;
  pattern?: string;
  maxItems?: number;
  minItems?: number;
  uniqueItems?: boolean;
  maxProperties?: number;
  minProperties?: number;
  required?: string[];
  enum?: any[];
}
export interface ServerObject {
  url: string;
  description?: string;
  variables?: Record<string, ServerVariableObject>;
}
export interface ServerVariableObject {
  enum?: string[] | boolean[] | number[];
  default: string | boolean | number;
  description?: string;
}
export interface LinkObject {
  operationRef?: string;
  operationId?: string;
  parameters?: LinkParametersObject;
  requestBody?: any | string;
  description?: string;
  server?: ServerObject;
}

export interface BaseParameterObject {
  description?: string;
  required?: boolean;
  deprecated?: boolean;
  allowEmptyValue?: boolean;
  style?: ParameterStyle;
  explode?: boolean;
  allowReserved?: boolean;
  schema?: SwaggerSchemaObject | SwaggerReferenceObject;
  examples?: Record<string, ExampleObject | SwaggerReferenceObject>;
  example?: any;
  content?: SwaggerContentObject;
}

export declare type HeaderObject = BaseParameterObject;

export declare type SwaggerHeadersObject = Record<
  string,
  HeaderObject | SwaggerReferenceObject
>;

export interface SwaggerResponseObject {
  description: string;
  headers?: SwaggerHeadersObject;
  content?: SwaggerContentObject;
  links?: SwaggerLinksObject;
}
export interface SwaggerReferenceObject {
  $ref: string;
}

export interface SwaggerResponsesObject extends Record<string, SwaggerReferenceObject | SwaggerResponseObject | undefined> {
  default?: SwaggerResponseObject | SwaggerReferenceObject;
}

export interface SwaggerOperationObject {
  operationId: string;
  parameters?: SwaggerParameter[];
  requestBody?: SwaggerRequestBodyObject;
  responses: SwaggerResponsesObject;
  method?: string;

  summary: string;
  consumes?: string[];
  description?: string;
  initialValue?: string;
  tags?: string[];
  name?: string;
  path?: string;
  samePath?: string;
}

export class SwaggerPathItemObject {
  // $ref?: string;
  // summary?: string;
  // description?: string;
  get?: SwaggerOperationObject;
  post?: SwaggerOperationObject;
  put?: SwaggerOperationObject;
  delete?: SwaggerOperationObject;
  patch?: SwaggerOperationObject;
  options?: SwaggerOperationObject;
  head?: SwaggerOperationObject;
  trace?: SwaggerOperationObject;
}
export declare type SwaggerPathsObject = Record<string, SwaggerPathItemObject>;
export interface SwaggerExternalDocumentationObject {
  description?: string;
  url: string;
}
export interface SwaggerTagObject {
  name: string;
  description?: string;
  externalDocs?: SwaggerExternalDocumentationObject;
}
export interface SwaggerContactObject {
  name?: string;
  url?: string;
  email?: string;
}
export interface SwaggerLicenseObject {
  name: string;
  url?: string;
}
export interface SwaggerInfoObject {
  title: string;
  description?: string;
  termsOfService?: string;
  contact?: SwaggerContactObject;
  license?: SwaggerLicenseObject;
  version: string;
}

export interface SwaggerDataSource {
  openapi: string;
  info: SwaggerInfoObject;
  name: string;
  paths: SwaggerPathsObject;
  tags?: SwaggerTagObject[];
  components: {
    schemas: SwaggerSchemas;
  };
}
