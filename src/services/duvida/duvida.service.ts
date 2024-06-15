// Initializes the `duvida` service on path `/duvida`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { Duvida } from './duvida.class';
import createModel from '../../models/duvida.model';
import hooks from './duvida.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'duvida': Duvida & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/duvida', new Duvida(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('duvida');

  service.hooks(hooks);
}
