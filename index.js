import express from 'express';
import mongodb from 'mongodb'
import graphql from 'graphql'
import assert from 'assert'
import graphqlHttp from 'express-graphql'
import bodyParser from 'body-parser';
import configMongo from './config/mongo'

import schema from './schema/index'

const GRAPHQL_PORT = 3000;

const graphQLServer = express();

mongodb.MongoClient.connect(configMongo.url, (err, mongo) => {
  assert.equal(null, err);

  graphQLServer.use('/graphql', bodyParser.json(), graphqlHttp({ 
    context: {mongo}, 
    schema: schema,
    graphiql: true 
  }));

  graphQLServer.use('/graphiql', graphqlHttp({ 
    endpointURL: '/graphql' 
  }));
  
  graphQLServer.listen(GRAPHQL_PORT, () =>
    console.log(
      `GraphiQL is now running on http://localhost:${GRAPHQL_PORT}/graphql`
    )
  );
})

