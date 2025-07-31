describe('Home page', () => {
    it('should load the page with no errors', () => {
        cy.request('/').should((response) => {
            expect(response.status).to.eq(200)
        });
    });
})