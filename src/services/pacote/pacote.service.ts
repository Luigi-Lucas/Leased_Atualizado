// Initializes the `pacote` service on path `/pacote`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { Pacote } from './pacote.class';
import createModel from '../../models/pacote.model';
import hooks from './pacote.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'pacote': Pacote & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/pacote', new Pacote(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('pacote');

  service.hooks(hooks);
}
