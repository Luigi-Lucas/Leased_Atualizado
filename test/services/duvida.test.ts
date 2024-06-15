import assert from 'assert';
import app from '../../src/app';

describe('\'duvida\' service', () => {
  it('registered the service', () => {
    const service = app.service('duvida');

    assert.ok(service, 'Registered the service');
  });
});
