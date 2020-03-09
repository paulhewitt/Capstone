package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	//"regexp"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"

	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/dynamodb"
	"github.com/aws/aws-sdk-go/service/dynamodb/dynamodbattribute"
)

//var nameRegexp = regexp.MustCompile(`[0-9]{3}\-[0-9]{10}`)
var errorLogger = log.New(os.Stderr, "ERROR ", log.Llongfile)

type schedule struct {
	Name           string `json:"name"`
	//Events         map[string]*dynamodb.AttributeValue `json:"events"`
	Events 			[]event `json:"events"`
}

type event struct {
	Title           string `json:"title"`
	Date        	string `json:"date"`
}

func router(req events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
	switch req.HTTPMethod {
	case "GET":
		return show(req)
	case "POST":
		return create(req)
	default:
		return clientError(http.StatusMethodNotAllowed)
	}
}

func show(req events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
	name := req.QueryStringParameters["name"]
	//if !nameRegexp.MatchString(name) {
	//	return clientError(http.StatusBadRequest)
	//}

	sch, err := getItem(name)
	if err != nil {
		return serverError(err)
	}
	if sch == nil {
		return clientError(http.StatusNotFound)
	}

	js, err := json.Marshal(sch)
	if err != nil {
		return serverError(err)
	}

	return events.APIGatewayProxyResponse{
		StatusCode: http.StatusOK,
		Headers: map[string]string{
			"Access-Control-Allow-Origin": "*",
			"Access-Control-Allow-Credentials": "true",},
		Body:       string(js),
	}, nil
}

func create(req events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
	if req.Headers["content-type"] != "application/json" && req.Headers["Content-Type"] != "application/json" {
		return clientError(http.StatusNotAcceptable)
	}

	sch := new(schedule)
	err := json.Unmarshal([]byte(req.Body), sch)
	if err != nil {
		return clientError(http.StatusUnprocessableEntity)
	}

	//if !nameRegexp.MatchString(bz.name) {
	//	return clientError(http.StatusBadRequest)
	//}
	if sch.Name == "" {
		return clientError(http.StatusBadRequest)
	}

	err = putItem(sch)
	if err != nil {
		return serverError(err)
	}

	return events.APIGatewayProxyResponse{
		StatusCode: 201,
		Headers:    map[string]string{"Location": fmt.Sprintf("/schedule?name=%s", sch.Name), "Access-Control-Allow-Origin": "*",
			"Access-Control-Allow-Credentials": "true",},
	}, nil
}

func serverError(err error) (events.APIGatewayProxyResponse, error) {
	errorLogger.Println(err.Error())

	return events.APIGatewayProxyResponse{
		StatusCode: http.StatusInternalServerError,
		Body:       http.StatusText(http.StatusInternalServerError),
	}, nil
}

func clientError(status int) (events.APIGatewayProxyResponse, error) {
	return events.APIGatewayProxyResponse{
		StatusCode: status,
		Body:       http.StatusText(status),
	}, nil
}

var db = dynamodb.New(session.New(), aws.NewConfig().WithRegion("us-east-1"))

func getItem(name string) (*schedule, error) {
	input := &dynamodb.GetItemInput{
		TableName: aws.String("scheduleTable"),
		Key: map[string]*dynamodb.AttributeValue{
			"name": {
				S: aws.String(name),
			},
		},
	}

	result, err := db.GetItem(input)
	if err != nil {
		return nil, err
	}
	if result.Item == nil {
		return nil, nil
	}

	sch := new(schedule)
	err = dynamodbattribute.UnmarshalMap(result.Item, sch)
	if err != nil {
		return nil, err
	}

	return sch, nil
}

// Add a schedule to DynamoDB.
func putItem(sch *schedule) error {
	//av := map[string]*dynamodb.AttributeValue{
	//	"title": {
	//		S: aws.String(sch.Events[0].Title),
	//	},
	//	"date": {
	//		S: aws.String(sch.Events.Date),
	//	},
	//}
	//var eventz []map[string]*dynamodb.AttributeValue
	//eventz = append(eventz, av)
	av, _ := dynamodbattribute.MarshalList(sch.Events)
	input := &dynamodb.PutItemInput{
		TableName: aws.String("scheduleTable"),
		Item: map[string]*dynamodb.AttributeValue{
			"name": {
				S: aws.String(sch.Name),
			},
			"events": {
				L: av,
			},
		},
	}

	_, err := db.PutItem(input)
	return err
}

func main() {
	lambda.Start(router)
}
