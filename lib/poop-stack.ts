import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';
import { LambdaIntegration, RestApi } from 'aws-cdk-lib/aws-apigateway';
import { Code, Function, Runtime } from 'aws-cdk-lib/aws-lambda';
import * as path from 'path';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';

export class PoopStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // // create route START
    // const testFunction = new NodejsFunction(this, 'test', {
    //   runtime: Runtime.NODEJS_20_X,
    //   handler: 'potato',
    //   entry: path.join(__dirname, 'handlers/testFunction.ts')
    // });

    // const testRouteIntegration = new LambdaIntegration(testFunction)

    // const api = new RestApi(this, 'poop-api');
    // // test endpoint
    // const testEndpoint = api.root.addResource('test');
    // testEndpoint.addMethod('get', testRouteIntegration);
    // // create route END


    // The code that defines your stack goes here

    // example resource
    // const queue = new sqs.Queue(this, 'PoopQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });

    /*
      root
        - /user
          - /profile
            - GET - get my profile
            - PUT - update my profile
        - /notes
          - GET - get all of my notes
          - POST - create a new note
          - /:noteId
            - GET - get my specific note by id
            - PUT - update my specific note by id
            - DELETE - remove my specific note
    */

    const notesApi = new RestApi(this, 'notes-api');

    // Notes routes
    // /profile
    const profileRoutes = notesApi.root.addResource('profile');
    // /notes
    // const notesRoutes = notesApi.root.addResource('notes');
    // // /notes/:noteId
    // const noteIdRoute = notesRoutes.addResource(':noteId');

    // Route Methods

    // Get Profile
    profileRoutes.addMethod('GET', createLambdaIntegration(this, 'handlers/profile', 'getProfile'));
    // Update Profile
    profileRoutes.addMethod('PUT', createLambdaIntegration(this, 'handlers/profile', 'updateProfile'));
    
    // // Get All Notes
    // notesRoutes.addMethod('GET', createLambdaIntegration(this, 'handlers/notes', 'getAllNotes'));
    // // Create new note
    // notesRoutes.addMethod('POST', createLambdaIntegration(this, 'handlers/notes', 'createNote'));
    // // Get specific note
    // noteIdRoute.addMethod('GET', createLambdaIntegration(this, 'handlers/notes', 'getNoteById'));
    // // Update specific note
    // noteIdRoute.addMethod('PUT', createLambdaIntegration(this, 'handlers/notes', 'updateNoteById'));
    // // Delete a note
    // noteIdRoute.addMethod('DELETE', createLambdaIntegration(this, 'handlers/notes', 'deleteNoteById'));


    // Utility Functions

    function createLambdaIntegration (context: Construct, filePath: string, handlerName: string) : LambdaIntegration{
      const newLambda = new NodejsFunction(context, `${handlerName}NodeFunction`, {
        runtime: Runtime.NODEJS_20_X,
        handler: handlerName,
        entry: path.join(__dirname, `${filePath}.ts`)
      })
      return new LambdaIntegration(newLambda);
    }


  }
}
