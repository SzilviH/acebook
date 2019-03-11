Staging:

All heroku CLI commands default to staging. When deploying deploy first to staging:
```git push staging master```
once changes have been tested deploy to production ``` git push production master```

Running locally:
Set up local db:

```
psql;
CREATE DATABASE acebook;
\c acebook;
CREATE TABLE posts (id SERIAL PRIMARY KEY, message VARCHAR, username VRCHAR(100);
```
Copy database url shown in terminal

Add .env file
- create .env file in root directory
```
DATABASE_URL = 'postgresql://<your_username>@localhost/acebook'
LOCAL = true
```

run =  ```heroku local```


