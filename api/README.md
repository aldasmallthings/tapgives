# [WEMAKEIMPACT(https://github.com/aldasmallthings/.1)
###### WEMAKE IMPACT non profit organisation


### Technology Stack
* [FastAPI](https://fastapi.tiangolo.com/), 
* [Python](https://www.python.org/downloads/release/python-3710) Python 3.8,
* [Pipenv](https://pipenv-fork.readthedocs.io/en/latest) to manage all dependencies (and sub-dependencies)


### Project structure:
```
.
├── wemakeimpact
    ├── user-service
        ├── Dockerfile
        ├── Pipfile
        ├── Pipfile.lock
        ├── app
            ├── __init__.py
            ├── config.py
            ├── main.py
    ├── project-service
        ├── Dockerfile
        ├── Pipfile
        ├── Pipfile.lock
        ├── app
            ├── user-service
            ├── Dockerfile
            ├── Pipfile
            ├── Pipfile.lock
            ├── api
                ├── __init__.py
                ├── db.py
                ├── processes.py
                ├── projects.py
                ├── schema.py
    ├── .dockerignore
    ├── .env.example
    ├── .gitignore
    ├── Makefile
    ├── nginx.conf
    ├── docker-compose.yml
    ├── README.md

```

### Project setup
###### Assuming docker is pre-installed

###### Environment File
Example `.env.example` file:

```bash

POSTGRES_PASSWORD=
POSTGRES_USER=app
POSTGRES_DB=tapgives_db
POSTGRES_SERVER=db
POSTGRES_PORT=

SECRET=

WEB_PORT = 4000

```

##### Api Access path for all the services
```
default http path: http://127.0.0.1:4000/api/v1/{service}/docs
```
###### Service names
* users :            ```from user-service```
* projects:    ``` from projects-service```

##### Development/Production environment propagation
```
make stack
```

##### Development/Production environment destroy
```
make tearstack
```

### Contribution guidelines

* Code review
* Other guidelines
* Contact [repo owner](mailto:rexynewton79@gmail.com) for more details.