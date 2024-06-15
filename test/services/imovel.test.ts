import assert from 'assert';
import app from '../../src/app';

describe('\'imovel\' service', () => {
  it('registered the service', () => {
    const service = app.service('imovel');

    assert.ok(service, 'Registered the service');
  });
});
