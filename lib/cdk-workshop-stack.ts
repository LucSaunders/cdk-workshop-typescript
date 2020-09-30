// import * as sns from '@aws-cdk/aws-sns';
// import * as subs from '@aws-cdk/aws-sns-subscriptions';
// import * as sqs from '@aws-cdk/aws-sqs';
import * as cdk from '@aws-cdk/core'

//ADD LAMBDA
import * as lambda from '@aws-cdk/aws-lambda'
//ADD APIGATEWAY
import * as apigw from '@aws-cdk/aws-apigateway'
//ADD HITCOUNTER
import { HitCounter } from './hitcounter'

export class CdkWorkshopStack extends cdk.Stack {
	constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
		super(scope, id, props)

		// const queue = new sqs.Queue(this, 'CdkWorkshopQueue', {
		//   visibilityTimeout: cdk.Duration.seconds(300)
		// });

		// const topic = new sns.Topic(this, 'CdkWorkshopTopic');

		// topic.addSubscription(new subs.SqsSubscription(queue));

		/*****************************/
		// define an AWS Lambda resource
		const hello = new lambda.Function(this, 'HelloHandler', {
			runtime: lambda.Runtime.NODEJS_10_X, // execution environment
			code: lambda.Code.fromAsset('lambda'), // code loaded from "lambda" directory
			handler: 'hello.handler', // file is "hello", function is "handler"
		})
		const helloWithCounter = new HitCounter(this, 'HelloHitCounter', {
			downstream: hello,
		})

		// define an API Gateway REST API resource backed by our "hello" function.
		new apigw.LambdaRestApi(this, 'Endpoint', {
			handler: helloWithCounter.handler,
		})
	}
}
