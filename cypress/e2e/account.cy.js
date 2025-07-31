describe('Account Creation', function () {
    before(function () {
        cy.generateRandomUser().as('newUser');
    });

    it('registers successfully', function () {
        const u = this.newUser;
        cy.visit('/customer/account/create');
        cy.get('.form-create-account').fillForm({
            firstname: u.name.first,
            lastname: u.name.last,
            email: u.email,
            password: u.login.password,
            password_confirmation: u.login.password
        }).find('button.submit').click();

        cy.url().should('include', '/customer/account/');
    });
});