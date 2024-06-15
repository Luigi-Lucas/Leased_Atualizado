// Initializes the `imovel` service on path `/imovel`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { Imovel } from './imovel.class';
import createModel from '../../models/imovel.model';
import hooks from './imovel.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'imovel': Imovel & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/imovel', new Imovel(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('imovel');

  service.hooks(hooks);
}
