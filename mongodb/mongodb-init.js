var db = connect("mongodb://admin:admin@localhost:27017/admin");

db = db.getSiblingDB('test'); // we can not use "use" statement here to switch db

db.createUser(
    {
        user: "user",
        pwd: "password",
        roles: [ { role: "readWrite", db: "test"} ],
        passwordDigestor: "server",
    }
)