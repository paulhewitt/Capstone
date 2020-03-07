package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"os"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"

	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/dynamodb"
)

var db = dynamodb.New(session.New(), aws.NewConfig().WithRegion("us-east-1"))

func Handler(req events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
	input := &dynamodb.ScanInput{
		TableName: aws.String("businessesTable"),
		//FilterExpression:
	}


	result, err := db.Scan(input)
	if err != nil {
		exitWithError(fmt.Errorf("failed to make Query API call, %v", err))
	}

	output, err := json.Marshal(result)

	return events.APIGatewayProxyResponse{
		StatusCode: http.StatusOK,
		Body:       string(output),
	}, nil
}

func exitWithError(err error) {
	fmt.Fprintln(os.Stderr, err)
	os.Exit(1)
}


func main() {
	lambda.Start(Handler)
}