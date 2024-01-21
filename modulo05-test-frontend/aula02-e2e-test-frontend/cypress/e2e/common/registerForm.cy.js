
class RegisterForm {
  elements = {
    titleInput: () => cy.get('#title'),
    titleFeedback: () => cy.get('#titleFeedback'),
    imageUrlInput: () => cy.get('#imageUrl'),
    imageUrlFeedback: () => cy.get('#urlFeedback'),
    submitBtn: () => cy.get('#btnSubmit'),

  }
  typeTitle(title) {
    if (!title) return;
    this.elements.titleInput().type(title);
  }
  typeImageUrl(url) {
    if (!url) return;
    this.elements.imageUrlInput().type(url);
  }
  clickSubmit() {
    this.elements.submitBtn().click();
  }

  iconShouldBeVisible() {
    this.elements.titleInput().should('not.have.class', '.invalid-feedback');
    this.elements.imageUrlInput().should('not.have.class', '.invalid-feedback');
  }



}

export const registerForm = new RegisterForm();