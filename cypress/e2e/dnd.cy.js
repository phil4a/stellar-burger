describe('Drag and Drop', () => {
	const bunToDrag = 'Ингредиент 1';
	const firstIngredientToDrag = 'Ингредиент 3';
	const secondIngredientToDrag = 'Ингредиент 4';

	const constructor = '[data-test-id="constructor"]';
	const topBunPlace = '[data-test-id="top-bun-constructor"]';
	const bottomBunPlace = '[data-test-id="bottom-bun-constructor"]';

	beforeEach(() => {
		cy.prepare();
	});

	it('should drag and drop bun', function () {
		cy.contains(bunToDrag).trigger('dragstart');
		cy.get(constructor).trigger('drop');
		cy.get(topBunPlace).contains(bunToDrag);
		cy.get(bottomBunPlace).contains(bunToDrag);
	});

	it('should drag and drop ingredient', function () {
		cy.contains(firstIngredientToDrag).trigger('dragstart');
		cy.get(constructor).trigger('drop');
		cy.get(constructor).contains(firstIngredientToDrag);
		cy.get(bottomBunPlace).should('not.contain', firstIngredientToDrag);
		cy.get(topBunPlace).should('not.contain', firstIngredientToDrag);

		cy.contains(secondIngredientToDrag).trigger('dragstart');
		cy.get(constructor).trigger('drop');
		cy.get(constructor)
			.should('contain', firstIngredientToDrag)
			.and('contain', secondIngredientToDrag);
		cy.get(bottomBunPlace).should('not.contain', secondIngredientToDrag);
		cy.get(topBunPlace).should('not.contain', secondIngredientToDrag);
	});
});
