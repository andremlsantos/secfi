# Secfi Back-End Assignment

The idea is to create a microservice that allows CRUD operations on a “users” table. The service should allow read and write operations following this interface:

```
interface IUser {
    firstName: string;
    lastName: string;
    userName: string;
    password: string;
    avatar: string;
}
```

<ul>
    <li> Service runs in a Docker container </li>
    <li> Passwords are stored in encrypted format </li>
    <li> Avatars are also stored </li>
</ul>

## Prerequisites

```
Install Node.js first. Built with latest version
```

## Reference API

Port exposed as 3000

#### Retrieve all users:

GET localhost:{port}/users

#### Retrieve a specific user:

GET localhost :{port}/users/{user id}

#### Create new user:

POST localhost:{port} /users/{user id}

```
Content-Type: multipart/form-data
 - firstName: the user first name as string
 - lastName: the user last name as string
 - userName: the username as string
 - password: the user password as string
 - avatar: the user avatar as a file type
```

#### Update a specific user:

PATCH localhost :{port}/users/{user id}

```
Content-Type: multipart/form-data
 - firstName: the user first name as string
 - lastName: the user last name as string
 - userName: the username as string
 - password: the user password as string
 - avatar: the user avatar as a file type
```

#### Delete a specific user:

DELETE localhost:3000/users/{user id}

### Description of usual server responses

-   200 OK – the request was successfully;
-   201 CREATED – the request was successfully created;
-   400 BAD REQUEST – the request was not understood;
-   404 NOT FOUND – the request was not found;
-   500 SERVER ERROR

### Installing

Runs on docker container

```
git clone https://github.com/andremlsantos/secfi-typescript.git
docker build -t secfi-typescript .
docker run -it -p 3000:3000 secfi-typescript
```

## Built With

-   [Express](https://expressjs.com/) - Web application server framework
-   [Bcrypt](https://www.npmjs.com/package/bcrypt) - A library to help you hash passwords
-   [Mongoose](https://mongoosejs.com/) - Elegant mongodb object modeling for node.js
-   [Multer](https://github.com/expressjs/multer) - Middleware for handling multipart/form-data, which is primarily used for uploading files
-   [Body-parser](https://github.com/expressjs/body-parser) - Node.js body parsing middleware.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
