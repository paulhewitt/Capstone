.PHONY: build clean deploy

build:
	dep ensure -v
	env GOOS=linux go build -ldflags="-s -w" -o bin/businesses businesses/main.go
	env GOOS=linux go build -ldflags="-s -w" -o bin/business business/main.go
	env GOOS=linux go build -ldflags="-s -w" -o bin/schedule schedule/main.go
	env GOOS=linux go build -ldflags="-s -w" -o bin/users users/main.go


clean:
	rm -rf ./bin ./vendor Gopkg.lock

deploy: clean build
	sls deploy --verbose
