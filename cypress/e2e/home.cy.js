describe('Home page', () => {
    it('loads successfuly', () => {
        it('should load the page with no errors', () => {
            cy.request('/').should((response) => {
                expect(response.status).to.eq(200)
            });
        })
    });
})