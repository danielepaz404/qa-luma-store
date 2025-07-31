Cypress.Commands.add('openMiniCart', () => {
    cy.get('[data-block="minicart"]')
        .find('._block-content-loading')
        .should('not.exist');

    cy.get('[data-block="minicart"]')
        .find('.action.showcart')
        .scrollIntoView()
        .click();

    cy.get('.minicart-items').should('be.visible');
})

Cypress.Commands.add('proceedToCheckout', () => {
    cy.get('#top-cart-btn-checkout').should('be.visible').scrollIntoView().click();

    cy.location('pathname')
        .should('include', '/checkout');
})

Cypress.Commands.add('fillAccountInfo', email => {
    cy.get('#shipping .form-login').should('be.visible').fillForm({
        username: email
    })
})

Cypress.Commands.add('fillShippingAddress', user => {
    cy.get('.form-shipping-address').as('shippingForm').should('be.visible').fillForm({
        firstname: user.name.first,
        lastname: user.name.last,
        'street[0]': user.location.street.name,
        'street[1]': user.location.street.number,
        city: user.location.city,
        postcode: user.location.postcode,
        telephone: user.phone

    })

    cy.get('@shippingForm').should('be.visible').find('select[name=country_id]').select(user.location.country);

    cy.get('@shippingForm').should('be.visible').within(() => {
        const $select = Cypress.$('select[name="region_id"]')

        if ($select.length && $select.is(':visible')) {
            cy.get('select[name="region_id"]')
                .select(user.location.state)
        } else {
            cy.get('input[name="region"]')
                .type(user.location.state)
        }
    })

});

Cypress.Commands.add('selectShippingMethod', () => {
    cy.get('#opc-shipping_method .loading-mask').should('not.exist');

    cy.get('.table-checkout-shipping-method input[type=radio]')
        .first()
        .check();

    cy.get('#shipping-method-buttons-container button.continue')
        .should('not.be.disabled')
        .click();
});

Cypress.Commands.add('placeOrder', () => {

    cy.get('#checkout-loader').should('not.exist');
    cy.get('#checkout-payment-method-load button.checkout')
        .should('be.visible')
        .click();

    cy.location('pathname').should('include', '/checkout/onepage/success');
});