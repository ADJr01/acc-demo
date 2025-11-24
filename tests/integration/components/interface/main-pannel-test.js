import { module, test } from 'qunit';
import { setupRenderingTest } from 'acc-demo/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | interface/main-pannel', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<Interface::MainPannel />`);

    assert.dom().hasText('');

    // Template block usage:
    await render(hbs`
      <Interface::MainPannel>
        template block text
      </Interface::MainPannel>
    `);

    assert.dom().hasText('template block text');
  });
});
