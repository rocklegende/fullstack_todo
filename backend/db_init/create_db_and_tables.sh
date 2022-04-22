#!/bin/bash

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    CREATE DATABASE todo_db;
EOSQL

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "todo_db" <<-EOSQL
CREATE TABLE todo(
                     todo_id SERIAL PRIMARY KEY,
                     user_id varchar(255) NOT NULL,
                     description VARCHAR(255)
);
EOSQL