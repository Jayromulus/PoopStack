import { APIGatewayProxyEvent, Handler } from "aws-lambda";

export const getProfile: Handler = async (event: APIGatewayProxyEvent) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      name: 'Me'
    })
  }
}

export const updateProfile = async (event: APIGatewayProxyEvent) => {
  const body = event.body;

  console.log(body)

  return {
    statusCode: 200,
    body: body
  }
}