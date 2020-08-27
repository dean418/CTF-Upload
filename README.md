# CTF-Upload

Platform for users to set-up a capture the flag style challenge where an admin can create challenges and teams can download and submit answers to challenges.

This application has a demo that you can view <a href="https://ctf-upload.herokuapp.com" target="_blank">here</a>

The admin password is `admin`
the ctf password is `abc`

This project was created using NodeJS, ExpressJS, MongoDB and Handlebarsjs

## Set-up
To run your own version of this project you will need a `.env` file with the following variables:

* `SECRET`: a secret for the session created by express
* `DB_URL`: a connection string to a mongoDB database
* `ADMIN`: the password you want to set for the admin
* `CTF_KEY`: the password you want to set for the CTF