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

var errorLogger = log.New(os.Stderr, "ERROR ", log.Llongfile)

type user struct {
	Id        string `json:"id"`
	Name      string `json:"name"`
	Email     string `json:"email"`
	PhotoUrl  string `json:"photoUrl"`
	FirstName string `json:"firstName"`
	LastName  string `json:"lastName"`
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

	bz, err := getItem(name)
	if err != nil {
		return serverError(err)
	}
	if bz == nil {
		return clientError(http.StatusNotFound)
	}

	js, err := json.Marshal(bz)
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

	usr := new(user)
	err := json.Unmarshal([]byte(req.Body), usr)
	if err != nil {
		return clientError(http.StatusUnprocessableEntity)
	}

	//if !nameRegexp.MatchString(bz.name) {
	//	return clientError(http.StatusBadRequest)
	//}
	if usr.Name == "" {
		return clientError(http.StatusBadRequest)
	}

	err = putItem(usr)
	if err != nil {
		return serverError(err)
	}

	return events.APIGatewayProxyResponse{
		StatusCode: 201,
		Headers:    map[string]string{"Location": fmt.Sprintf("/users?name=%s", usr.Name), "Access-Control-Allow-Origin": "*",
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

func getItem(name string) (*user, error) {
	input := &dynamodb.GetItemInput{
		TableName: aws.String("usersTable"),
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

	usr := new(user)
	err = dynamodbattribute.UnmarshalMap(result.Item, usr)
	if err != nil {
		return nil, err
	}

	return usr, nil
}

// Add a business to DynamoDB.
func putItem(usr *user) error {
	input := &dynamodb.PutItemInput{
		TableName: aws.String("usersTable"),
		Item: map[string]*dynamodb.AttributeValue{
			"id": {
				S: aws.String(usr.Id),
			},
			"name": {
				S: aws.String(usr.Name),
			},
			"Email": {
				S: aws.String(usr.Email),
			},
			"photoUrl": {
				S: aws.String(usr.PhotoUrl),
			},
			"firstName": {
				S: aws.String(usr.FirstName),
			},
			"lastName": {
				S: aws.String(usr.LastName),
			},
		},
	}

	_, err := db.PutItem(input)
	return err
}

func main() {
	lambda.Start(router)
}
