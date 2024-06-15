// Initializes the `resposta` service on path `/resposta`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { Resposta } from './resposta.class';
import createModel from '../../models/resposta.model';
import hooks from './resposta.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'resposta': Resposta & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/resposta', new Resposta(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('resposta');

  service.hooks(hooks);
}
