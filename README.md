This is a solution to the exercise: https://github.com/BCM-ENERGY-team/bcm-backend-interview

The solution is in the form of a simple nodejs server with one callable route.

## Usage
To run:
```
$ npm install
$ npm start
```
This will launch a server on port 8080.

To run the tests:
```
$ npm run test
```

## Notes
- this solution also handles [Bonus #1]
- @todo: tests will fail if server is running. They cannot run at the same time.

## Architecture
- This is a simple nodejs server which uses `express`
- There are a few config options in the `.env` file
- The tests are run with `mocha`
- We did not use a database as the quantity of data for the exercise is easily handled by a slow computer
- The response of the route is of the form
```
[
    {
        operatingAirlines: [AF, BA],
        sellingAirline : AF
        from: CDG,
        to: JFK,
        stopOvers: [HKG]
    },
    ...
]
```


## Bonus

###  Cache and reuse results
A solution could be to use a simple key-value cache such as `redis`. It can be integrated into nodejs in a few lines and is easily shared between multiple instances. Caching per {airlineCode-from-to} triplet would be the obvious first choice.

### Endpoint security
Endpoint security can be handled in multiple ways and it all really depends on who will use the API.

If the API is used by a known small group of users, the IAM solutions by google cloud or AWS should be sufficient.

For a public url without an explicit whitelist my preference is for a json web token authentication combined with a saas solution such as `auth0` or equivalent. This can be handled at the API level or at the API gateway/ reverse proxy level.
The advantage with the first solution is that there are less servers to maintain/ configure but each new API built in this way will require its own security configuration. However, the second solution decouples authentication/ authorisation from the API and allows for greater flexibility on how the API gets used (internally/ externally).

### Rate limiting
For API route rate limits, there are multiple nodejs libraries such as `express-rate-limit` which can control the rate. Alternatively, AWS or google cloud will allow you to configure the ACL.
