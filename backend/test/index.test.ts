import request from "superwstest";
import server from "../src/index";
import { before, after, describe } from "mocha";

let testInventory = [
  { coinId: 1, amountOwned: 800 },
  { coinId: 2, amountOwned: 2 },
  { coinId: 3, amountOwned: 0 },
  { coinId: 4, amountOwned: 0 },
  { coinId: 5, amountOwned: 0 },
];

let inventory = [
  { coinId: 1, amountOwned: 1000 },
  { coinId: 2, amountOwned: 0 },
  { coinId: 3, amountOwned: 0 },
  { coinId: 4, amountOwned: 0 },
  { coinId: 5, amountOwned: 0 },
];

let coins = [
  { id: 1, name: "USD", price: 1 },
  { id: 2, name: "CoinA", price: 100 },
  { id: 3, name: "CoinB", price: 100 },
  { id: 4, name: "CoinC", price: 100 },
  { id: 5, name: "CoinD", price: 100 },
];

describe("Check home path", () => {
  afterEach((done) => server.close(done));

  it("check home", async () => {
    await request(server).get("/").expect(200);
  });
});

describe("Server endpoints and Web sockets", () => {
  before((done) => {
    server.listen(0, "localhost", done);
  });

  after((done) => {
    server.close(done);
  });

  it("Get coins endpoint", async () => {
    await request(server).get("/get-coins").expect(200).expect(coins);
  });

  it("Get inventory endpoint", async () => {
    await request(server).get("/get-inventory").expect(200).expect(inventory);
  });

  it("Purchase coin endpoint", async () => {
    await request(server)
      .post("/purchase-coin")
      .send({ coinId: 2, amount: 2 })
      .expect(200)
      .expect({ success: true, inventory: testInventory });
  });
});

describe("WebSocket Server Testing", () => {
  before((done) => {
    server.listen(0, "localhost", done);
  });

  after((done) => {
    server.close(done);
  });

  it("Check CoinB price", async () => {
    await request(server)
      .ws("")
      .expectJson((actual) => actual.coins[2].price === 100) // get price at 0 seconds
      .wait(5000) //wait for 5 seconds
      .expectJson((actual) => actual.coins[2].price === 101) // get price at 10 seconds
      .wait(5000) //wait for 5 seconds
      .expectJson((actual) => actual.coins[2].price === 102) // get price at 15 seconds
      .close()
      .expectClosed();
  });

  it("Check inventory after purchase coin", async () => {
    await request(server)
      .ws("")
      .exec(async () => {
        await request(server)
          .post("/purchase-coin") //send a post request
          .send({ coinId: 2, amount: 2 })
          .expect(200)
          .expect({ success: true, inventory: testInventory });
      })
      .wait(5000) //wait for 5 seconds for response
      .expectJson((actual) => console.log(actual)) // show data after 5 seconds
      .wait(5000) //wait for 5 seconds for response
      .expectJson((actual) => console.log(actual)) // show data after 10 seconds
      .expectJson((actual) => actual.inventory[1].amountOwned === 2)
      .close()
      .expectClosed();
  });
});

