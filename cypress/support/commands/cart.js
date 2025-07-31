Cypress.Commands.add('addLastSearchResultToCart', () => {
    cy.searchForTerm('shirt')
        .its('response.statusCode')
        .should('eq', 200);

    cy.get('.product-items').should('be.visible');

    cy.intercept('POST', '**/checkout/cart/add/**').as('addToCart');

    cy.get('.product-item').last().should('be.visible')
        .pickSwatch('size')
        .pickSwatch('color')
        .find('button.tocart')
        .click({ force: true });

    return cy.wait('@addToCart');
});
