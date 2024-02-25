import { APIGatewayProxyEvent, Handler } from "aws-lambda";

export const potato: Handler = async (event: APIGatewayProxyEvent) => {
  return { statusCode: 200, body: JSON.stringify({ event: 'test' }) };
};