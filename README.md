# Whatfry

Whatfry is a web chat that allows to chat with all people 
who have an account.

## Installation

First of all, you need to have Node and Angular cli Installed.
If it's not you can install through this link: https://nodejs.org/en/


#### To install angular/cli use this following command
```bash
  npm install -g @angular/cli   
```

## Run Locally

#### Clone the project

```bash
  git clone https://github.com/projet-qualite/whatfry.git
```

- #### Open the client folder

```bash
  npm install
  ng serve
```

- #### Open the server folder

```bash
  npm install
  npm install express
```

In the server folder rename .env.example to .env, fill all these variables and create your database

    TOKEN_SECRET=
    PORT=3000
    DATABASE_NAME=
    DATABASE_PASSWORD=
    DATABASE_USERNAME=



#### Export the models to the database
```bash
  npm run migrate
```


#### Run your app
```bash
  npm run dev
```

## Screenshots

[http://localhost:4200/auth/signup](http://localhost:4200/auth/signup)
<img width="1440" alt="sign-up" src="https://user-images.githubusercontent.com/57530450/190910940-ea9845ab-0534-494f-8bcc-b3d10013ca12.png">

[http://localhost:4200/auth/login](http://localhost:4200/auth/login)
<img width="1440" alt="login" src="https://user-images.githubusercontent.com/57530450/190911033-55fca7b0-a1e4-4322-aaea-98c3a15bff82.png">

[http://localhost:4200/auth/dashboard](http://localhost:4200/auth/dashboard)
<img width="1440" alt="Capture d’écran 2022-09-18 à 16 06 48" src="https://user-images.githubusercontent.com/57530450/190911153-1fc9dd94-3bc4-460a-817f-8b4d456b0275.png">



## 🚀 About Me
I'm a junior full stack developer.
You can find more information about me at the link: https://frymarshall.com


## Tech Stack

**Server:** Node, Express, Angular, Typescript


## License

[MIT](https://choosealicense.com/licenses/mit/)

