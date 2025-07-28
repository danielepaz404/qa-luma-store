/// <reference types="cypress" />

describe('base tests', () => {
    beforeEach(() => {
    cy.intercept(
        {
        url: 'https://magento.softwaretestingboard.com/**',
        middleware: true,
        },
        (req) => {
        req.on('response', (res) => {
            // Throttle the response to 1 Mbps to simulate a
            // mobile 3G connection
            res.setThrottle(100)
        })
        }
    )
    })

    it('should load the page with no errors', () => {
        cy.request('https://magento.softwaretestingboard.com/')
        .should((response) => {
            expect(response.status).to.eq(200)
        });
    })

    it('should search for shirt',  {
      retries: {
        runMode: 2,
        openMode: 2,
      },
    }, () => {
        cy.intercept('https://magento.softwaretestingboard.com/catalogsearch/result/**').as('results');
        cy.visit('https://magento.softwaretestingboard.com/')
        cy.get('#search').type('shirt{enter}')
        
        cy.location().should(loc => {
            expect(loc.toString()).to.eq('https://magento.softwaretestingboard.com/catalogsearch/result/?q=shirt');
        });
        cy.wait('@results');

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