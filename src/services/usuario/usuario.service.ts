// Initializes the `usuario` service on path `/usuario`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { Usuario } from './usuario.class';
import createModel from '../../models/usuario.model';
import hooks from './usuario.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'usuario': Usuario & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/usuario', new Usuario(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('usuario');

  service.hooks(hooks);
}
