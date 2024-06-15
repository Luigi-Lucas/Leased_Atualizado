import assert from 'assert';
import app from '../../src/app';

describe('\'locacao\' service', () => {
  it('registered the service', () => {
    const service = app.service('locacao');

    assert.ok(service, 'Registered the service');
  });
});
