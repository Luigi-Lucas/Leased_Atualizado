import assert from 'assert';
import app from '../../src/app';

describe('\'resposta\' service', () => {
  it('registered the service', () => {
    const service = app.service('resposta');

    assert.ok(service, 'Registered the service');
  });
});
