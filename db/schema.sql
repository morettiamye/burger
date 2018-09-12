-- create db --
create database burgers_db;

-- use db -- 
use burgers_db;

-- create table --
create table burgers (
    id integer(11) auto_increment not null,
    burger_name varchar(255) not null,
    devoured boolean not null,
    primary key (id)
);