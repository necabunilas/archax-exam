import request from 'superwstest';
import server from '../src/index';

describe('Check home path', () => {
  afterEach((done) => server.close(done));

  it('check home', async () => {
    await request(server)
      .get('/')
      .expect(200);
  });
});

describe('Server endpoints', () => {
  beforeEach((done) => server.listen(0, 'localhost', done));
  afterEach((done) => server.close(done));
  
  it('Get coins endpoint', async () => {
    await request(server)
      .get('/get-coins')
      .expect(200)
      .expect([{ id: 1, name: "USD", price: 1 },
      { id: 2, name: "CoinA", price: 100 },
      { id: 3, name: "CoinB", price: 100 },
      { id: 4, name: "CoinC", price: 100 },
      { id: 5, name: "CoinD", price: 100 }])
  });

  it('Get inventory endpoint', async () => {
    await request(server)
      .get('/get-inventory')
      .expect(200)
      .expect([{ coinId: 1, amountOwned: 1000 },
        { coinId: 2, amountOwned: 0 },
        { coinId: 3, amountOwned: 0 },
        { coinId: 4, amountOwned: 0 },
        { coinId: 5, amountOwned: 0 }])
  });
  
  let testInventory = [{ coinId: 1, amountOwned: 800 },
    { coinId: 2, amountOwned: 2 },
    { coinId: 3, amountOwned: 0 },
    { coinId: 4, amountOwned: 0 },
    { coinId: 5, amountOwned: 0 }]; 
    
  it('Purchase coin endpoint', async () => {
    await request(server)
      .post('/purchase-coin')
      .send({coinId: 2, amount: 2})
      .expect(200)
      .expect({ success: true, inventory: testInventory })   
  });
  
});

