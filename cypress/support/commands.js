Cypress.Commands.add('searchForTerm', term => {
    cy.intercept('GET', '/catalogsearch/result/**').as('results');
    cy.get('#search').type(`${term}{enter}`);
    return cy.wait('@results');
});

Cypress.Commands.add(
    'pickSwatch',
    { prevSubject: 'element' },
    (subject, attribute, index = 0) => {
        cy.wrap(subject)
            .find(`.swatch-attribute.${attribute} .swatch-option`)
            .eq(index)
            .click()
            .should('have.class', 'selected');

        cy.get('.swatch-option-loading').should('not.exist');
        return cy.wrap(subject);
    }
)

Cypress.Commands.add(
    'fillForm',
    { prevSubject: 'element' },
    (subject, data) => {
        Object.entries(data).forEach(([field, value]) => {
            cy.get(`#${field}`)
                .should('be.visible')
                .clear()
                .type(value)
        })

        return cy.wrap(subject);
    }
)

Cypress.Commands.add('generateRandomUser', () => {
    return cy
        .request({
            method: 'GET',
            url: 'https://randomuser.me/api/?password=special,upper,lower,number,8-16',
        })
        .its('body.results[0]')
})

Cypress.Commands.add('login', (email, password) => {
    cy.visit('/customer/account/login');
    cy.get('#email').type(email);
    cy.get('#pass').type(password);
    cy.get('button.login').click();
});
