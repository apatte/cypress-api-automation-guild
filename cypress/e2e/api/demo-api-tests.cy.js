import { faker } from "@faker-js/faker";

describe("Pet API Tests", () => {
  let newPet = {
    id: faker.number.int(),
    category: {
      id: 1,
      name: "cats",
    },
    name: faker.internet.userName(),
    status: "available",
  };

  it("POST - should create a new pet", () => {
    cy.request({
      method: "POST",
      url: "/pet",
      body: newPet,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.name).to.eq(newPet.name);
      expect(response.body.id).to.eq(newPet.id);
      expect(response.body.category.name).to.eq(newPet.category.name);
    });
  });
  it("GET - should get a pet by ID", () => {
    cy.request({
      method: "GET",
      url: "/pet/" + newPet.id,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.id).to.eq(newPet.id);
    });
  });
  it("DELETE - should delete the created pet", () => {
    cy.request({
      method: "DELETE",
      url: "/pet/" + newPet.id,
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
    cy.request({
      method: "GET",
      url: "/pet/123456",
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(404);
    });
  });
});
