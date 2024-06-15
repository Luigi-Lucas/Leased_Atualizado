import assert from 'assert';
import app from '../../src/app';

describe('\'pacote\' service', () => {
  it('registered the service', () => {
    const service = app.service('pacote');

    assert.ok(service, 'Registered the service');
  });
});
