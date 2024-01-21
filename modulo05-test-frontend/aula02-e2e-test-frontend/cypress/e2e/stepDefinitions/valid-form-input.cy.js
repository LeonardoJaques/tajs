import { Then } from '@badeball/cypress-cucumber-preprocessor';
import { registerForm } from '../common/registerForm.cy.js';

Then('The inputs should be cleared', function () {
  registerForm.elements.titleInput().should('have.value', '')
  registerForm.elements.imageUrlInput().should('have.value', '')
})

Then('I should see a check icon in the title field', function () {
  registerForm.iconShouldBeVisible()
})