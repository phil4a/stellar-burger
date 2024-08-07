describe('Modal', () => {
	const ingredientToSearch = 'Ингредиент 1';
	const modalTitleText = 'Детали ингредиента';

	beforeEach(() => {
		cy.prepareAndOpenModal(ingredientToSearch, modalTitleText);
	});

	it('should open modal and check ingredient name', function () {
		cy.get('@modalTitle').should('exist');
		cy.get('[data-test-id="ingredient-name"]').should('have.text', ingredientToSearch);
	});

	it('should close modal on press close icon', function () {
		cy.closeModalWithButton();
	});

	it('should close modal on press esc', function () {
		cy.closeModalWithEsc();
	});

	it('should close modal on click outside', function () {
		cy.closeModalWithClickOutside();
	});
});
