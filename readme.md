# Protenga Node-RED JWT

this project is created by Muhammad Nazir - mnazirp@gmail.com 

## Installation

Im using Typescript for this project along with another important module (node-red, jwt, ts-node, etc...)
please follow the steps below:

```installation
yarn install
```

## Usage

```
develpment using nodemon:
yarn start:dev

start the RED:
yarn start

build the project:
yarn build

```

## Testing the project
```get token
first you must get token from the url `http://localhost:1880/login` using POST method along with body:
    {
        "username": "mnazirp",
        "password": "admin"
    }
```RED admin
by the token that we got, we can go to admin using url `http://localhost:1880/red`, for example:
{authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1uYXppcnAiLCJwYXNzd29yZCI6ImFkbWluIiwiaWF0IjoxNjIwMTIyODQ4fQ.BJ8gLfTN9Vi4Ip6hBKEmIEgExBjdY8tB1gx5V3m9Bjo}

```API Hello
by using token in authorization header, we can test the RED-flow (flow1) in url `http://localhost:1880/api/hello?name=nazir`
if the token not embeded the api will respon with 403 forbiden.

```
## License
[MIT](https://choosealicense.com/licenses/mit/)