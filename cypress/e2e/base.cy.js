/// <reference types="cypress" />

describe('home page', () => {
    it('should load the page with no errors', () => {
        cy.request('/').should((response) => {
            expect(response.status).to.eq(200)
        });
    })
});

describe('search', () => {
    it('should redirect to results page when search for shirt', () => {
        cy.searchForTerm('shirt');

        cy.location().should(loc => {
            expect(loc.toString()).to.eq(`${Cypress.config('baseUrl')}/catalogsearch/result/?q=shirt`);
        });

        cy.get('.results').should('be.visible');
    })
});

describe('add to cart', () => {
    it('should add last product from result page to cart', () => {
        cy.visit('/');
        cy.searchForTerm('shirt');

        cy.get('.search.results .product-items .product-item').last().then(lastProductItem => {
            lastProductItem.find('.swatch-attribute.size .swatch-option').first().trigger('click');
            lastProductItem.find('.swatch-attribute.color .swatch-option').first().trigger('click');

            lastProductItem.find('button.tocart').trigger('click');
        })

        cy.get("[data-block='minicart']").find('.counter-number').should(count => {
            expect(count.text()).to.equal('1');
        });
    })
})