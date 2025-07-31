describe('Add to Cart', () => {
    beforeEach(() => cy.visit('/').then(() => cy.searchForTerm('shirt')));

    it('adds the last product to cart', () => {
        cy.intercept('POST', '**/checkout/cart/add/**').as('addToCart');
        cy.get('.product-item').last()
            .pickSwatch('size')
            .pickSwatch('color')
            .find('button.tocart').click({force: true});
        cy.wait('@addToCart');
        cy.get('[data-block=minicart] .counter-number')
            .should('have.text', '1');
    });
});