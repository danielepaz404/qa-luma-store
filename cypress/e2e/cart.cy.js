describe('Add to Cart', function () {
     beforeEach(function () {
        cy.visit('/');
     });

    it('adds the last product to cart', function () {
        cy.addLastSearchResultToCart();
        cy.get('[data-block=minicart] .counter-number')
            .should('have.text', '1');
    });
});