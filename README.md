# Archax-exam

## frontend testing using cypress
The file is in <b>frontend/cypress/e2e/assertions.cy.ts</b><br>
To run cypress type in cmd: <b>npx cypress open</b><br>
Choose test in electron to open the test file<br>

<br>
<br>

## backend testing using superwstest
The file is in <b>backend/test/index.test.ts</b><br>
To run the testing type in cmd: <b>npx mocha --require ts-node/register test/index.test.ts --timeout 15000</b><br>
I used mocha incorporated with superwstest just to run the tests.<br>
I made the timeout 15 seconds so that it can accomodate the change of prices in websocket testing.<br>

# SDET Exercise

This exercise is to help us better understand your experience in writing integration tests and additionally testing APIs.

## Setup

The exercise consists of two apps that run on your local machine, a frontend app and a backend app. To complete the task you'll need to run both apps.

#1. First, start the backend by executing the following:

```
cd backend;
yarn install;
yarn dev;
```

#2. Second, start the frontend by executing the following:

```
cd frontend;
yarn install;
yarn dev;
```

## Task

We would like you to test both the frontend and backend apps with a few small tests. Below is a screen capture of what the frontend app looks like after it has been loaded. Please use Cypress (https://www.cypress.io) to test the frontend, and use SuperWsTest (https://www.npmjs.com/package/superwstest) to test the backend. Layout the tests in whatever folder structure and/or naming convention you deem sensible.

The Cypress tests should -

- on load of the front end
  - assert that you begin with a $1000 USD balance
  - assert that there are four coin options available
- after buying three coins
  - assert "Coins owned" has incremented by the quantity you provided
  - assert that the "Market value" correctly reflects the cost per coin.

The SuperWsTest tests should -

- when testing the endpoints
  - test for a successful response payload from the `purchase-coin` endpoint after a buy order is placed
- when testing the websocket
  - test that CoinB incremements by one dollar with each message over a period of time.
  - test that `inventory.<coinId>.amountOwned` correctly reflects your owned inventory following a `purchase-coin` execution.

Additional Notes

- Please spend as much time as you feel necessary to complete the task and show off your skills.
- We are looking for code quality and legibility, future-proofing concepts, code re-use, etc.
- Add comments where necessary or to document any assumptions/considerations you may have.

## Screen Capture

![Screenshot of SDET Exercise](sdet-exercise.png)
