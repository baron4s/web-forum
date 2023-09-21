describe('Login spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/login');
  });
  it('should display login page correctly', () => {
    cy.get("input[placeholder='example@gmail.com']").should('be.visible');
    cy.get("input[placeholder='Your password']").should('be.visible');
    cy.get('button').contains('Login').should('be.visible');
  });
  it('should dislay alert when email empty', () => {
    cy.get('button').contains('Login').click();

    cy.on('window:alert', (alert) => {
      expect(alert).to.equal('"email" is not allowed to be empty');
    });
  });
  it('should dislay alert when password empty', () => {
    cy.get("input[placeholder='example@gmail.com']").type('nafisah@gmail.com');
    cy.get('button').contains('Login').click();

    cy.on('window:alert', (alert) => {
      expect(alert).to.equal('"password" is not allowed to be empty');
    });
  });
  it('should dislay alert when email and password are correct', () => {
    cy.get("input[placeholder='example@gmail.com']").type('nafisah@gmail.com');
    cy.get("input[placeholder='Your password']").type('tes12');
    cy.get('button').contains('Login').click();

    cy.on('window:alert', (alert) => {
      expect(alert).to.equal('email or password is wrong');
    });
  });
  it('should dislay alert when email and password are correctly', () => {
    cy.get("input[placeholder='example@gmail.com']").type('nafisah@gmail.com');
    cy.get("input[placeholder='Your password']").type('nafisah');
    cy.get('button').contains('Login').click();

    cy.on('window:alert', (alert) => {
      expect(alert).to.equal('success login');
    });
  });
});
