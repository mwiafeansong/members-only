# Members Only

This is a solution to the [Members Only Project on The Odin Project](https://www.theodinproject.com/lessons/nodejs-members-only).
A fullstack web app where users get to view messages created by members. Only members are are able to write messages, view authors of messages and dates the messages were created. To be a member a secret password is required while signing up.
Admins become automatic members when they sign up provided they sign up with the right secret password. They are able to delete messages created by members.

Secret Password for membership: music
Secret Password for admins: adminmusic

## Table of contents

- [Link](#link)
- [Built with](#built-with)
- [What I learned](#what-i-learned)

### Link

[Live Demo]()

### Built with

- MongoDB
- Mongoose
- Express
- NodeJS
- Pug
- PassportJS
- CSS custom properties

### What I learned

- Using Passport for user authentication
- Storing user sessions in mongoDB
- Validating password confirmation field custom express validators
- Creating hashed passwords with bcrypt
