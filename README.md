# Next.js OpenJira App

For run locally, you need the database.

```
docker-compose up -d
```

- The -d, means **detached**

* MongoDB URL Local:

```
mongodb://localhost:27017/entriesdb
```

## Configure the environment variables

Rename the file **.env.template** to **.env.**

## Fill the DB with test information

```
http://localhost:3000/api/seed
```
