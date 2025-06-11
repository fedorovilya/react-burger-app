/// <reference types="cypress" />

import {ingredientsMock} from "./ingredientsData";

describe('E2E тест: drag&drop ингредиента в конструктор', () => {

	beforeEach(() => {
		cy.intercept('GET', '**/ingredients', {
			statusCode: 200,
			body: ingredientsMock,
		}).as('getIngredients');

		cy.visit('/');
		cy.wait('@getIngredients');
	});

	it('должен перетаскивать булку и начинку в конструктор', () => {
		const bunId = ingredientsMock.data[0]._id;
		const mainId = ingredientsMock.data[1]._id;

		const bunName = ingredientsMock.data.find((item) => item._id === bunId)?.name;
		const mainName = ingredientsMock.data.find((item) => item._id === mainId)?.name;

		if (!bunName || !mainName) {
			throw new Error('Не найдены имена ингредиентов');
		}

		// Перетаскиваем булку в зону top_bun_area и проверяем что она появилась в контейнере для булки
		cy.get(`#ingredient-${bunId}`).should('exist').trigger('dragstart');
		cy.get('#top_bun_area').should('exist').trigger('drop').trigger('dragend');
		cy.contains('.constructor-element__text', bunName).should('exist');

		// Перетаскиваем ингредиент в зону ingredients_area и проверяем что она появилась в контейнере для ингредиентов
		cy.get(`#ingredient-${mainId}`).should('exist').trigger('dragstart');
		cy.get('#ingredients_area').should('exist').trigger('drop').trigger('dragend');
		cy.contains('.constructor-element__text', mainName).should('exist');


		// Ищем добавленный ингредиент и удаляем его из конструктора
		const elementToDeleteId = `constructor_${mainId}`;
		cy.get(`#${elementToDeleteId}`).within(() => {
			cy.get('.constructor-element__action').should('exist').click();
		});
		cy.get(`#${elementToDeleteId}`).should('not.exist');
	});
})
