Cypress.Commands.add('searchForTerm', term => {
    cy.intercept('GET', '**/catalogsearch/result/**').as('results');
    cy.get('#search').type(`${term}{enter}`);
    return cy.wait('@results');
});