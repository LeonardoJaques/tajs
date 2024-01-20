import { Given, Then, When } from '@badeball/cypress-cucumber-preprocessor';

Given('I am on the image registration page', function () {
  cy.visit('/')
})
When('I enter {string} in the title field', function () { })
Then('I enter {string} in the URL field', function () { })
Then('I click the submit button', function () { })