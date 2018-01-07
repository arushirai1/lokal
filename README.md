
This is a simple GraphQL server which creates and retreives a user. You must have installed mongodb and have it's server running. Configure the url name in config/mongo.
```javascript
 
npm install node --save
npm install babel babel-core babel-preset-node6 babel-register --save
npm install body-parser --save
npm install express express-graphql --save
npm install graphql graphql-custom-types graphql-tools --save
```

At this point this code does not support the latest mongodb version so install this one:
```javascript

npm install mongodb@2.2.33 --save

npm install babel-cli babel-preset-env --save-dev
```


# Testing

Run the server using:

```
babel-node index.js
```
This is to ensure that you don't get ES6 errors. Then open http://localhost:3000/graphql

## Get started
```
    mutation RootMutation {
        createUser(input: {name: "test", email: "test@test.com", password: "pass", street: "123 Street", cityState: "City, State", zip: 95014, picUrl: "https://s3-us-west-1.amazonaws.com/pictures-lokal/24303501016_4bf7c90de8_o+(2).jpg", bio: "I am a test user"}) {
            ok
        }   
    }

    query {
        user(email: "test@test.com") {
            name
        }
    }

```