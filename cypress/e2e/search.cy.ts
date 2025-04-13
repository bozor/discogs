describe('Open app and get some search results', () => {
  beforeEach(() => {
    cy.visit('/');
  });
  
  it('Is able to open the root url', () => {});

  it('Is able to input a search term and see results', () => {
    cy.get('input[data-cy="search-input"').invoke('attr', 'value', 'test');

    cy.get('button[data-cy="search-button"]').click();

    cy.url().then(url => {
        cy.visit(url + 'test');
    });

    cy.get('a[data-cy="search-result"]').should('be.visible');
  });

  it('Is able to input a search term, see results and view a release', () => {
    cy.get('input[data-cy="search-input"').invoke('attr', 'value', 'test');

    cy.get('button[data-cy="search-button"]').click();

    cy.url().then(url => {
        cy.visit(url + 'test');
    });

    cy.get('a[data-cy="search-result"]').first().click();

    cy.get('div[data-cy="release"]').should('be.visible');
  });
})