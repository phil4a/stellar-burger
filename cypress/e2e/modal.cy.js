describe('Modal', () => {
	const ingredientToSearch = 'Ингредиент 1';

	beforeEach(() => {
		cy.prepare();
		cy.contains(ingredientToSearch).should('exist').click();
	});

	it('should open modal and check ingredient name', function () {
		cy.contains('Детали ингредиента').should('exist');
		cy.get('[data-test-id="ingredient-name"]').should('have.text', ingredientToSearch);
	});

	it('should close modal on press close icon', function () {
		cy.get('[aria-label="Закрыть"]').should('exist').click();
		cy.contains('Детали ингредиента').should('not.exist');
	});

	it('should close modal on press esc', function () {
		cy.contains('Детали ингредиента').should('exist');
		cy.get('body').type('{esc}');
		cy.contains('Детали ингредиента').should('not.exist');
	});

	it('should close modal on click outside', function () {
		cy.contains('Детали ингредиента').should('exist');
		cy.get('[data-test-id="modal"]').then(($modal) => {
			const modal = $modal[0];
			const { top, right, bottom, left } = modal.getBoundingClientRect();
			cy.get('body').click(left - 10, top - 10);
		});
		cy.contains('Детали ингредиента').should('not.exist');
	});
});
