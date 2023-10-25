
## Description

Backend на Nest JS для приложения Cloud Mix (chatting app)

SWAGGER API документация находится по маршруту: /api/docs
## Installation

```bash
$ npm install
```

## Environment variables
Необходимо создать в корне проекта файл: .development.env либо .production.env
Переменные: 
```bash
PORT=4000
POSTGRES_HOST=
POSTGRES_USER=
POSTGRES_DB=
POSTGRES_PASSWORD=
POSTGRES_PORT=5432
PRIVATE_KEY=
DOMAIN=
ORIGIN_URL=

```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Docker
Для локальной разработки можно поднять docker-compose, внутри которого postgres и само приложение.
postgres по умолчанию поднимается на порту 5432
```bash
$ docker-compose up
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

