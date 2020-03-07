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

type business struct {
	UserName       string `json:"userName"`
	UserId         string `json:"userId"`
	Name           string `json:"name"`
	Address        string `json:"address"`
	AddressDetails string `json:"addressDetails"`
	City           string `json:"city"`
	State          string `json:"state"`
	Country        string `json:"country"`
	PostalCode     string `json:"postalCode"`
	Type       	   string `json:"type"`
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

	bz := new(business)
	err := json.Unmarshal([]byte(req.Body), bz)
	if err != nil {
		return clientError(http.StatusUnprocessableEntity)
	}

	//if !nameRegexp.MatchString(bz.name) {
	//	return clientError(http.StatusBadRequest)
	//}
	if bz.Name == "" || bz.Address == "" {
		return clientError(http.StatusBadRequest)
	}

	err = putItem(bz)
	if err != nil {
		return serverError(err)
	}

	return events.APIGatewayProxyResponse{
		StatusCode: 201,
		Headers:    map[string]string{"Location": fmt.Sprintf("/businesses?name=%s", bz.Name), "Access-Control-Allow-Origin": "*",
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

func getItem(name string) (*business, error) {
	input := &dynamodb.GetItemInput{
		TableName: aws.String("businessesTable"),
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

	bz := new(business)
	err = dynamodbattribute.UnmarshalMap(result.Item, bz)
	if err != nil {
		return nil, err
	}

	return bz, nil
}

// Add a business to DynamoDB.
func putItem(bz *business) error {
	input := &dynamodb.PutItemInput{
		TableName: aws.String("businessesTable"),
		Item: map[string]*dynamodb.AttributeValue{
			"userName": {
				S: aws.String(bz.UserName),
			},
			"userId": {
				S: aws.String(bz.UserId),
			},
			"name": {
				S: aws.String(bz.Name),
			},
			"address": {
				S: aws.String(bz.Address),
			},
			"addressDetails": {
				S: aws.String(bz.AddressDetails),
			},
			"city": {
				S: aws.String(bz.City),
			},
			"state": {
				S: aws.String(bz.State),
			},
			"country": {
				S: aws.String(bz.Country),
			},
			"postalCode": {
				S: aws.String(bz.PostalCode),
			},
			"type": {
				S: aws.String(bz.Type),
			},
		},
	}

	_, err := db.PutItem(input)
	return err
}

func main() {
	lambda.Start(router)
}
