import { OperationResponse } from "../../openapi-typescript-codegen/client/interfaces/OperationResponse";
import { OpenApi } from "../../openapi-typescript-codegen/openApi/v3/interfaces/OpenApi";
import { OpenApiReference } from "../../openapi-typescript-codegen/openApi/v3/interfaces/OpenApiReference";
import { OpenApiResponse } from "../../openapi-typescript-codegen/openApi/v3/interfaces/OpenApiResponse";
import { getOperationResponse } from "../../openapi-typescript-codegen/openApi/v3/parser/getOperationResponse";
import { getOperationResponseCode } from "../../openapi-typescript-codegen/openApi/v3/parser/getOperationResponseCode";
import { getRef } from "../../openapi-typescript-codegen/openApi/v3/parser/getRef";
import { SwaggerDataSource, SwaggerResponsesObject } from "../interfaces/swagger.interface";

export const getOperationResponses = (
  openApi: SwaggerDataSource,
  responses: SwaggerResponsesObject,
): OperationResponse[] => {
  const operationResponses: OperationResponse[] = [];

  // Iterate over each response code and get the
  // status code and response message (if any).
  for (const code in responses) {
    if (responses.hasOwnProperty(code)) {
      const responseOrReference = responses[code];
      const response = getRef<OpenApiResponse>(openApi as OpenApi, responseOrReference as OpenApiResponse & OpenApiReference);
      const responseCode = getOperationResponseCode(code);

      if (responseCode) {
        const operationResponse = getOperationResponse(
          openApi as OpenApi,
          response,
          responseCode,
        );
        operationResponses.push(operationResponse);
      }
    }
  }

  // Sort the responses to 2XX success codes come before 4XX and 5XX error codes.
  return operationResponses.sort((a, b): number => {
    return a.code < b.code ? -1 : a.code > b.code ? 1 : 0;
  });
};
