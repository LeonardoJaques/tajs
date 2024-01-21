import { Given, Then, When } from '@badeball/cypress-cucumber-preprocessor';
import { registerForm } from './registerForm.cy.js';

Given('I am on the image registration page', function () {
  cy.visit('/')
})
When('I enter {string} in the title field', function (title) {
  registerForm.typeTitle(title)
})
Then('I enter {string} in the URL field', function (url) {
  registerForm.typeImageUrl(url)
})
Then('I click the submit button', function () {
  registerForm.clickSubmit()
})
Then('I can hit enter to submit the form', function () {
  cy.focused().type('{enter}')
})