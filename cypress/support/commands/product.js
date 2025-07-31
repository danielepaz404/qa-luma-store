Cypress.Commands.add(
    'pickSwatch',
    { prevSubject: 'element' },
    (productItem, attribute, index = 0) => {
        return cy
            .wrap(productItem)                                   
            .find(`.swatch-attribute.${attribute} .swatch-option`)                         
            .eq(index)                                    
            .should('be.visible')                        
            .click()                                      
            .should('have.class', 'selected')            
            .then(() => productItem)                             
    }
)