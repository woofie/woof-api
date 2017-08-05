WOOF API
===========================
API for WOOF

Currently it's available at [https://woof-api.herokuapp.com/](https://woof-api.herokuapp.com/)

TODO
----
 [  ] Change the structure of conversation to match what client needs 

Getting Started
---------------
Make sure you have this environment variable

```
export MONGODB_URI='<mongodb uri>'
export WOOF_USER='<username for the api basic auth>'
export WOOF_PASSWORD='<password for the api basic auth>'
```

#### Running the app
```
npm install
npm run start-dev
```

The API will be available in [http://localhost:3001](http://localhost:3001)

Available Endpoint
------------------

This API use `Basic Authentication`

* GET `/api/conversation`

    Get all of conversation

* POST `/api/conversation`

    Store new speech record

    Request body:
    ```
    {
        "transcript":"I'm happy",
        "documents": {
            "score":0.87231002391
        }
    }
    ```

Deploy to Heroku
-----------------
The app is ready to be deployed to Heroku.

In production, Heroku will use `Procfile` which boots just the server:

```
web: npm run server
```

### Steps

We assume basic knowledge of Heroku.

**0. Setup your Heroku account and Heroku CLI**

For installing the CLI tool, see [this article](https://devcenter.heroku.com/articles/heroku-command-line).

**1. Create the Heroku app**

```
heroku apps:create hackathon-starter
```

**2. Push to Heroku**

```
git push heroku master
```

Heroku will give you a link at which to view your live app.