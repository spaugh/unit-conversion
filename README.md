# Citrine Frontend Challenge

#### Installation with Docker (recommended):
```
$ cd citrine-frontend-challenge
$ docker build -t arm-citrine .
$ docker run -p 8080:8080 -it arm-citrine
```

#### Installation without Docker:
```
$ cd citrine-frontend-challenge
$ yarn install
$ PORT=8080 PRECISION=14 yarn start
```

###### A note about `PRECISION`: This environment variable is passed to the node app and dictates the precision of returned `multiplication_factor` parameters. This value of this environment variable is limited to 1000, due to the number of digits of Pi stored. However, because JavaScript precision limit for floats is 15 digits, precisions of 16 or higher will change the API response such that `multiplication_factor` is returned as a string.

#### Testing and linting:
```
$ cd citrine-frontend-challenge
$ yarn test
$ yarn lint
```
