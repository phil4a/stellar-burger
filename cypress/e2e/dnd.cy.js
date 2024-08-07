describe('Drag and Drop', () => {
	const bunToDrag = 'Ингредиент 1';
	const firstIngredientToDrag = 'Ингредиент 3';
	const secondIngredientToDrag = 'Ингредиент 4';

	const constructor = '[data-test-id="constructor"]';
	const topBunPlace = '[data-test-id="top-bun-constructor"]';
	const bottomBunPlace = '[data-test-id="bottom-bun-constructor"]';

	beforeEach(() => {
		cy.prepare();
		cy.get(constructor).as('burgerConstructor');
		cy.get(topBunPlace).as('topBunPlace');
		cy.get(bottomBunPlace).as('bottomBunPlace');
	});

	it('should drag and drop bun', function () {
		cy.contains(bunToDrag).as('bunToDrag');
		cy.dragAndDrop('@bunToDrag', '@burgerConstructor');
		cy.get('@topBunPlace').contains(bunToDrag);
		cy.get('@bottomBunPlace').contains(bunToDrag);
	});

	it('should drag and drop ingredient', function () {
		cy.contains(firstIngredientToDrag).as('firstIngredientToDrag');
		cy.dragAndDrop('@firstIngredientToDrag', '@burgerConstructor');
		cy.get('@burgerConstructor').contains(firstIngredientToDrag);
		cy.get('@bottomBunPlace').should('not.contain', firstIngredientToDrag);
		cy.get('@topBunPlace').should('not.contain', firstIngredientToDrag);

		cy.contains(secondIngredientToDrag).as('secondIngredientToDrag');
		cy.dragAndDrop('@secondIngredientToDrag', '@burgerConstructor');
		cy.get('@burgerConstructor')
			.should('contain', firstIngredientToDrag)
			.and('contain', secondIngredientToDrag);
		cy.get('@bottomBunPlace').should('not.contain', secondIngredientToDrag);
		cy.get('@topBunPlace').should('not.contain', secondIngredientToDrag);
	});
});
