## Installation

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

## Design

#### Expression Evaluation

The bulk of the work of this project is encased in the `expressions` package in `src/expressions`. This package provides reasonably generic expression parsing tools. Though several functions are exposed, the expected use is to simply import the `convertToSI` expression, which returns the converted expression and a multiplicative conversion factor. Additionally, the following useful functions are provided:

- `expressions.parse` parses mathematical expressions into tokens of types defined in `expressions/tokens`. Operators are currently limited to multiplication and division.
- `expressions.evaluate` evaluates any tokenized mathematical function. Again, operators are currently limited to multiplication and division. Will return a decimal.js object.

As an example, the previously described functions could be used to evaluate some mathematical function:

```javascript
const parse = require('./parse');
const evaluate = require('./evaluate');

const tokens = parse('(3 * 4 / 2)/((2/3) * 3.5 / (3.0))');
evaluate(tokens).toPrecision(4) === '7.714' // True
```

The evaluation of an expression is broken into two steps:

- Infix to postfix conversion via a reduced version of the [Shunting-Yard Algorithm](https://en.wikipedia.org/wiki/Shunting-yard_algorithm). By reduced, it is meant that, due to only supporting * and / operators, operator precedence rules are ignored. Supporting other operators would require extension of this implementation. 
- Postfix evaluation. Like RPN calculators, operators are applied to the previous two elements of the stack.

#### Decimal Precision

In order to achieve accurate arbitrary decimal precision, the package [decimal.js](http://mikemcl.github.io/decimal.js) was used. This tool provides functionality similar to bignumber.js, but in a cleaner package. Additionally, 1025 digits of π are included. Currently, this is the only precision limiting factor - increasing precision beyond 1000 would require more digits of π, due to its inclusion in some conversion factors.

#### Web Server

The library chosen, Koa, comes as a rewrite of the extremely popular express package in order to take advantage of the new `async`/`await` keywords in JavaScript. This allows proper `try{} catch(){}` blocks in addition to easily composable middleware.

#### Testing

Jest was used. For the API server, supertest was used.