# archax-exam

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
