//Общие команды
Cypress.Commands.add('prepare', () => {
	cy.intercept('GET', 'ingredients', { fixture: 'ingredients' }).as('getIngredients');
	cy.visit('/');
	cy.wait('@getIngredients');
});

//Команды для модального окна
Cypress.Commands.add('prepareAndOpenModal', (ingredientToSearch, modalTitleText) => {
	cy.prepare();
	cy.contains(ingredientToSearch).as('ingredientToSearch').should('exist').click();
	cy.contains(modalTitleText).as('modalTitle').should('exist');
	cy.get('[data-test-id="modal"]').as('modal');
});

Cypress.Commands.add('closeModalWithEsc', () => {
	cy.get('body').type('{esc}');
	cy.get('@modalTitle').should('not.exist');
});

Cypress.Commands.add('closeModalWithClickOutside', () => {
	cy.get('@modal').then(($modal) => {
		const modal = $modal[0];
		const { top, right, bottom, left } = modal.getBoundingClientRect();
		cy.get('body').click(left - 10, top - 10);
	});
	cy.get('@modalTitle').should('not.exist');
});

Cypress.Commands.add('closeModalWithButton', () => {
	cy.get('[aria-label="Закрыть"]').as('closeButton').should('exist').click();
	cy.get('@modalTitle').should('not.exist');
});

//Команды для Drag and Drop
Cypress.Commands.add('dragAndDrop', (dragSelector, dropSelector) => {
	cy.get(dragSelector).trigger('dragstart');
	cy.get(dropSelector).trigger('drop');
});
