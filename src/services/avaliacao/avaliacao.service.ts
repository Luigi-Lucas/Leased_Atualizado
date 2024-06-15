// Initializes the `avaliacao` service on path `/avaliacao`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { Avaliacao } from './avaliacao.class';
import createModel from '../../models/avaliacao.model';
import hooks from './avaliacao.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'avaliacao': Avaliacao & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/avaliacao', new Avaliacao(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('avaliacao');

  service.hooks(hooks);
}
