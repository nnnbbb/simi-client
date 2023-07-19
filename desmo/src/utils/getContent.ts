import { SwaggerContentObject, SwaggerSchema } from "../interfaces/swagger.interface";
import { isDefined } from "./isDefined";

export interface Content {
  mediaType: string;
  schema: SwaggerSchema;
}

const BASIC_MEDIA_TYPES = [
  'application/json-patch+json',
  'application/json',
  'application/x-www-form-urlencoded',
  'text/json',
  'text/plain',
  'multipart/form-data',
  'multipart/mixed',
  'multipart/related',
  'multipart/batch',
];

export function getContent(content: SwaggerContentObject): Content | null {
  const basicMediaTypeWithSchema = Object.keys(content)
    .filter((mediaType) => {
      const cleanMediaType = mediaType.split(';')[0].trim();
      return BASIC_MEDIA_TYPES.includes(cleanMediaType);
    })
    .find((mediaType) => isDefined(content[mediaType]?.schema));
  if (basicMediaTypeWithSchema) {
    return {
      mediaType: basicMediaTypeWithSchema,
      schema: content[basicMediaTypeWithSchema].schema as SwaggerSchema,
    };
  }

  const firstMediaTypeWithSchema = Object.keys(content).find((mediaType) =>
    isDefined(content[mediaType]?.schema),
  );
  if (firstMediaTypeWithSchema) {
    return {
      mediaType: firstMediaTypeWithSchema,
      schema: content[firstMediaTypeWithSchema].schema as SwaggerSchema,
    };
  }
  return { mediaType: "", schema: { $ref: "" } };
};
