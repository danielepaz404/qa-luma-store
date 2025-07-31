describe('Search Flow', () => {
    beforeEach(() => cy.visit('/'));

    it('searches for "shirt" and shows results', () => {
        cy.searchForTerm('shirt')
            .its('response.statusCode').should('eq', 200);
        cy.get('.results').should('be.visible');
    });

    it('clicks the last autocomplete suggestion', () => {
        cy.intercept('GET', '**/search/ajax/suggest/?q=shirt**').as('suggest');
        cy.get('#search').type('shirt', { delay: 100 });
        cy.get('#search_autocomplete').should('be.visible');
        cy.wait('@suggest');
        cy.get('#search_autocomplete ul li').last().click();
    });
});