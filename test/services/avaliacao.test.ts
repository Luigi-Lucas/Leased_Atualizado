import assert from 'assert';
import app from '../../src/app';

describe('\'avaliacao\' service', () => {
  it('registered the service', () => {
    const service = app.service('avaliacao');

    assert.ok(service, 'Registered the service');
  });
});
