Cypress.Commands.add(
    'fillForm',
    { prevSubject: 'element' },
    (subject, data) => {
        cy.wrap(subject).within(() => {
            Object.entries(data).forEach(([field, value]) => {
                cy.get(`input[name='${field}']`)
                    .should('be.visible')
                    .clear()
                    .type(value, { parseSpecialCharSequences: false })
            })
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