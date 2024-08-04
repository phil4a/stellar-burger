describe('Modal', () => {
	const ingredientToSearch = 'Ингредиент 1';

	it('should open modal', function () {
		cy.prepare();
		cy.contains(ingredientToSearch).should('exist').click();
		cy.contains('Детали ингредиента').should('exist');
		cy.get('[data-test-id="ingredient-name"]').should('have.text', ingredientToSearch);
	});

	it('should find correct ingredient name', function () {
		cy.prepare();
		cy.contains(ingredientToSearch).should('exist').click();
		cy.get('[data-test-id="ingredient-name"]').should('have.text', ingredientToSearch);
	});
});
