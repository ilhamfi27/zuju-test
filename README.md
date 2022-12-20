# Zuju Digital Code Submission
## Link To Hosted Application

## Running Locally
### Using Docker
1. ```cd build/docker```
2. ```docker compose up -d```
3. Open ```http://localhost:31080``` or direct to the docs ```http://localhost:31080/api-docs``` (31080 is docker published port)

### Using NPM
1. ```cp .env.example .env```
2. Edit .env file based on your environment (ex: database, port listening, etc)
3. ```npm run migrate```
4. ```npm run seed```
5. ```npm run dev```
6. Open ```http://localhost:1321``` or direct to the docs ```http://localhost:1321/api-docs``` (1321 is port config from .env.example)

## Build App 
### Using Docker
1. ```cd build/docker```
2. ```docker compose -f docker-compose.yml -f docker-compose.production.yml build zuju-test```
3. ```docker compose -f docker-compose.yml -f docker-compose.production.yml up -d```

### Using NPM
1. ```npm run build```
2. ```npm run start```

## Auth For Restricted API
### Basic Auth
Credentials (By Default):
```
username: admin
password: supersecretauth

```

These credentials can be changed from .env file
