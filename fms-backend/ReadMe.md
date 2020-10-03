# Getting Started


#Install MySql and create connection as root/root and port:3306 and create below schema 
CREATE SCHEMA `fms_db` ;

#Tables will create automatically once we run application
#Insert records into Roles table as below
INSERT INTO fms_db.roles(role_name) VALUES('ROLE_USER');
INSERT INTO fms_db.roles(role_name) VALUES('ROLE_ADMIN'); 