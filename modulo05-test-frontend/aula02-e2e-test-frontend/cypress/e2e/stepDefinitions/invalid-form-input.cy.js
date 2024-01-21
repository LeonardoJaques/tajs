import { Then } from '@badeball/cypress-cucumber-preprocessor';
import { registerForm } from '../common/registerForm.cy.js';

Then('I should see {string} message above the title field', function (text) {
  registerForm.elements.titleFeedback().should('contain.text', text)
})
Then('I should see {string} message above the imageUrl field', function (text) {
  registerForm.elements.imageUrlFeedback().should('contain.text', text)
})
Then('I should see an exclamation icon in the title and URL fields', function () {
  registerForm.iconShouldBeVisible()
})
