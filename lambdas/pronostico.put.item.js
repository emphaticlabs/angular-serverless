const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB({
  apiVersion: '2012-08-10',
  region: 'us-east-2'
});
exports.handler = (event, context, callback) => {
  // TODO implement
  const params = {
    Item: {
      "UserId": {
        S: event.UserId
      },
      "fixtureId": {
        N: event.pronostico.fixtureId
      },
      "teams": {
        M: {
          "home": {
            M: {
              "name": {
                S: event.pronostico.teams.home.name
              },
              "id": {
                N: event.pronostico.teams.home.id
              },
              "score": {
                N: event.pronostico.teams.home.score
              }
            }
          },
          "away": {
            M: {
              "name": {
                S: event.pronostico.teams.away.name
              },
              "id": {
                N: event.pronostico.teams.away.id
              },
              "score": {
                N: event.pronostico.teams.away.score
              }
            }
          }
        }
      },
      "fixtureDate": {
        S: event.pronostico.fixtureDate
      },
      "timeStamp": {
        S: event.pronostico.timeStamp
      }
    },
    TableName: 'pronosticos'
  };
  dynamodb.putItem(params, function(err, result) {
    if (err) {
      console.log(err);
      callback(err);
    } else {
      callback(null, result);
    }
  });
};
