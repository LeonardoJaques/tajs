import preprocessor from '@badeball/cypress-cucumber-preprocessor';
import createEsBuildPlugin from '@badeball/cypress-cucumber-preprocessor/esbuild';
import createBundler from "@bahmutov/cypress-esbuild-preprocessor";
import { defineConfig } from "cypress";

async function setupNodeEvents(on, config) {
  await preprocessor.addCucumberPreprocessorPlugin(on, config);
  on('file:preprocessor', createBundler({
    plugins: [
      createEsBuildPlugin.default(config),
    ],
  }));
  return config;
}
const { WEB_SERVER_URL } = process.env
if (!WEB_SERVER_URL) {
  // console.error('Missing WEB_SERVER_URL environment variable!!!')
  // process.exit(1)
  throw new Error('Missing WEB_SERVER_URL environment variable!!!')
}
export default defineConfig({
  e2e: {
    setupNodeEvents,
    specPattern: 'cypress/e2e/features/*.feature',
    baseUrl: WEB_SERVER_URL,
  },
});
