DROP TABLE IF EXISTS users
CASCADE;

CREATE TABLE users
(
  id SERIAL PRIMARY KEY NOT NULL,
  email varchar(255) UNIQUE NOT NULL,
  password varchar(255) NOT NULL,
  -- REQUIRED IN ORDER TO FIND A USERS PROFILE???
  spotify_uuid varchar(255)
);


