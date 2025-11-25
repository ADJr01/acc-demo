import { module, test } from 'qunit';
import { setupTest } from 'acc-demo/tests/helpers';

module('Unit | Service | indexStore', function (hooks) {
  setupTest(hooks);

  // TODO: Replace this with your real tests.
  test('it exists', function (assert) {
    let service = this.owner.lookup('service:index-store');
    assert.ok(service);
  });
});
