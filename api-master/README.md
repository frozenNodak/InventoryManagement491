# UND Inventory Management System API

TODO: Project Description here
Demo server url: http://54.174.7.166

## Working with API

The first time you clone the api branch to your machine run the following

```
npm install
```

After that you can simply run 

(**MAKE SURE YOU HAVE A MYSQL SERVER RUNNING OR IT WILL ERROR**)

```
sails.lift
```

**sails.lift** will start the api and allow your request to go through to the database. 

**Ctrl + C** to stop the server

(Running on localhost:3000 for the time being) 

After that you can you **Postman** to test api calls. To run tests cases and check code coverage run the following

```
npm test
```

This will run mocha to test the test cases written for the api and give you the precentage of code covered.
