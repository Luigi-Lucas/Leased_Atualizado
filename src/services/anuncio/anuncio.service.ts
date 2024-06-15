// Initializes the `anuncio` service on path `/anuncio`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { Anuncio } from './anuncio.class';
import createModel from '../../models/anuncio.model';
import hooks from './anuncio.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'anuncio': Anuncio & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/anuncio', new Anuncio(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('anuncio');

  service.hooks(hooks);
}
