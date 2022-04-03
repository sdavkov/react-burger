import { API_URL } from '../../src/utils/constants';

describe('Constructor page works correctly', function () {
	beforeEach(() => {
		cy.intercept("POST", `${API_URL}orders`).as("postOrder");
		cy.intercept("POST", `${API_URL}auth/login`).as("login");
		cy.intercept("GET", `${API_URL}auth/user`).as("getUserInfo");
		cy.intercept("GET", `${API_URL}ingredients`).as("getIngredients");
		cy.intercept("POST", `${API_URL}auth/token`).as("refreshToken");

		cy.visit("http://localhost:3000/login");
		cy.get("[name^=email]").type("sdavkov@yandex.ru");
		cy.get("[name^=password]").type("Qazxc123");
		cy.get("button").contains("Войти").click();
		cy.wait("@login").then((interception) => { });
	});

	it("should open ingredients popup", () => {
		cy.wait("@getIngredients").then((interception) => { });
		cy.get("[class^=burger-ingredient-item_item__]").first().click();
		cy.get("[class^=modal_close]").click();
	});

	it("constructor should work", () => {
		cy.visit("http://localhost:3000");
		cy.get("[class^=burger-ingredient-item_item__]")
			.contains("Мясо")
			.first()
			.as("main");

		cy.get("[class^=burger-ingredient-item_item__]")
			.contains("булка")
			.first()
			.as("bun");

		cy.get("[class^=burger-constructor_list__]").as("constructor");

		cy.get("@bun").trigger("dragstart");
		cy.get("@constructor").trigger("drop");
		cy.get("@main").trigger("dragstart");
		cy.get("@constructor").trigger("drop");

		cy.get("button").contains("Оформить заказ").as("submit");

		cy.get("@submit").click().wait("@postOrder").then((interception) => { });;
		cy.get("[class^=modal_close]").click();
	});
}); 