/// <reference types="cypress" />

import {ingredientsMock} from "./ingredientsData";
import {mockUser} from "./userData";
import {orderMock} from "./orderResponseData";

describe('E2E тест: добавление ингредиентов и создание заказа', () => {
	beforeEach(() => {
		cy.intercept('GET', '**/ingredients', {
			statusCode: 200,
			body: ingredientsMock,
		}).as('getIngredients');

		cy.intercept('POST', '**/auth/login', {
			statusCode: 200,
			body: mockUser
		}).as('loginRequest');

		cy.intercept('POST', '**/orders', {
			statusCode: 200,
			body: orderMock
		}).as('createOrder');

		cy.visit('/');
		cy.wait('@getIngredients');
	});

	function login() {
		cy.visit('/login');
		cy.get('[data-test="login_input"]').type(mockUser.user.email);
		cy.get('[data-test="password_input"]').type('password');
		cy.get('[data-test="login_btn"]').click();
		cy.wait('@loginRequest');

		cy.location('pathname').should('eq', '/');
	}

	it('должен успешно залогиниться, оформить заказ и очистить конструктор', () => {
		const bunId = ingredientsMock.data[0]._id;
		const mainId = ingredientsMock.data[1]._id;

		const bunName = ingredientsMock.data.find((item) => item._id === bunId)?.name;
		const mainName = ingredientsMock.data.find((item) => item._id === mainId)?.name;

		if (!bunName || !mainName) {
			throw new Error('Не найдены имена ингредиентов');
		}

		// логинимся
		login();

		// добавляем в конструктор
		cy.get(`#ingredient-${bunId}`).should('exist').trigger('dragstart');
		cy.get('#top_bun_area').should('exist').trigger('drop').trigger('dragend');

		cy.get(`#ingredient-${mainId}`).should('exist').trigger('dragstart');
		cy.get('#ingredients_area').should('exist').trigger('drop').trigger('dragend');

		cy.get('[data-test="order-btn"]').click({ force: true });

		// Проверяем открытие модального окна
		cy.get('#modal_window_overlay').should('exist');
		cy.get('#modal_window_content').should('exist');

		cy.get('[data-test="order_number"]').should('contain', orderMock.order.number);

		cy.get('#modal_close_btn').click();

		cy.contains('.constructor-element__text', bunName).should('not.exist');
		cy.contains('.constructor-element__text', mainName).should('not.exist');
	});
})
