/// <reference types="cypress" />

describe('Checkout', function () {
    before(function () {
        cy.generateRandomUser().as('newUser');
    })

    beforeEach(function () {
        cy.visit('/');
        cy.addLastSearchResultToCart().its('response.statusCode').should('eq', 200);;
    });

    it('should successfully complete the purchase', function () {
        const user = this.newUser;
        cy.openMiniCart();
        cy.proceedToCheckout();
        cy.fillAccountInfo(user.email);
        cy.fillShippingAddress(user);
        cy.selectShippingMethod();
        cy.placeOrder();
    })
})
