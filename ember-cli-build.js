'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');
const isProductionApp = () => process.env.EMBER_ENV === 'production';
module.exports = function (defaults) {
  const app = new EmberApp(defaults, {
    emberData: {
      deprecations: {
        // New projects can safely leave this deprecation disabled.
        // If upgrading, to opt-into the deprecated behavior, set this to true and then follow:
        // https://deprecations.emberjs.com/id/ember-data-deprecate-store-extends-ember-object
        // before upgrading to Ember Data 6.0
        DEPRECATE_STORE_EXTENDS_EMBER_OBJECT: false,
      },
    },
    // Add options here
    'ember-font-awesome': {
      useScss: false,
      useLess: false,
    },
    minifyJS: {
      enabled: isProductionApp(),
    },
    minifyCSS: {
      enabled: isProductionApp(),
      options: { processImport: true }
    },
  });

  return app.toTree();
};
