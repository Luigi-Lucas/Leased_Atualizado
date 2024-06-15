import assert from 'assert';
import app from '../../src/app';

describe('\'anuncio\' service', () => {
  it('registered the service', () => {
    const service = app.service('anuncio');

    assert.ok(service, 'Registered the service');
  });
});
