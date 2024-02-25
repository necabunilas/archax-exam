describe("Assertions spec", () => {

  beforeEach(() => {
    cy.visit('http://127.0.0.1:5173/');
    // Assuming the WebSocket connection initializes the coins array
    cy.wait(2000);
  })

  it("assert that you begin with a $1000 USD balance", () => {
    cy.get(".inventory div").eq(1).should("have.text", "USD Balance: $1000");
  });

  it("assert that there are four coin options available", () => {
    cy.get(".ticket-name").eq(0).should("have.text", "CoinA");
    cy.get(".ticket-name").eq(1).should("have.text", "CoinB");
    cy.get(".ticket-name").eq(2).should("have.text", "CoinC");
    cy.get(".ticket-name").eq(3).should("have.text", "CoinD");
    cy.get(".ticket-name").eq(4).should("not.exist");
  });

  it('assert "Coins owned" has incremented by the quantity you provided', () => {
    cy.get(".purchase-input").eq(1).type("2"); // Enter quantity for Coin B
    cy.get(".action-button").eq(2).click(); //click buy for Coin B
    cy.get(".coins-owned").eq(1).should("have.text", "Coins owned: 2"); //increment amount owned for Coin B
  });

  it('assert that the "Market value" correctly reflects the cost per coin', () => {
    cy.get(".purchase-input").eq(1).type("2"); // Enter quantity for Coin B
    cy.get(".action-button").eq(2).click(); //click buy for Coin B

    cy.get(".m-value").eq(1).invoke("text").as("divText"); // get text and save it as divText variable

    // Use the saved text in subsequent commands or assertions
    cy.get("@divText").then((text) => {
      const textAsString = text as unknown as string; // Explicitly convert to string
      const integerMatch = textAsString.match(/\d+/);
      const integerValue = integerMatch ? parseInt(integerMatch[0], 10) : null;

      cy.get(".amount-owned")
        .eq(1)
        .should("have.text", `Market value: $${integerValue}`); //increment amount owned for Coin B
    });
  });
});
