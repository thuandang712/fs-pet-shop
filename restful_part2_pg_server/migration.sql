DROP DATABASE IF EXISTS petshop;
CREATE DATABASE petshop;
\c petshop;

DROP TABLE IF EXISTS pets;
CREATE TABLE pets (
    pet_id serial PRIMARY KEY,
    "name" varchar(255),
    age integer,
    kind varchar(255)
);