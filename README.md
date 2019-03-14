Pipelines:
- commit to your feature branch
- create pull request in github
- assuming no conflicts and travis CI passes, merge pull request
- this deploys to staging in heroku automatically (takes a couple of mins)
- test in staging and promote to prod if all good (either promote in heroku or command line:
`heroku pipelines:promote -r staging`)

Running locally:
Set up local db:

```
psql;
CREATE DATABASE acebook;
\c acebook;

CREATE TABLE posts (id SERIAL PRIMARY KEY, message VARCHAR, username VARCHAR);

CREATE TABLE likes (likeID SERIAL PRIMARY KEY, postID INTEGER, FOREIGN KEY (postID) REFERENCES posts(id));

```
Copy database url shown in terminal

Add .env file
- create .env file in root directory
```
DATABASE_URL = 'postgresql://<your_username>@localhost/acebook'
LOCAL = true
```
If cloning this repo ensure the .evn has the correct database url param.

run =  ```heroku local```

test commit
