import { Sequelize, DataTypes, Model } from 'sequelize';
import { Application } from '../declarations';
import { HookReturn } from 'sequelize/types/hooks';

export default function (app: Application): typeof Model {
  const sequelizeClient: Sequelize = app.get('sequelizeClient');
  const usuario = sequelizeClient.define('usuario', {

    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },

    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    cpf: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },

    rg: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },

    telefone: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    endereco: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false
    },

  }, {
    hooks: {
      beforeCount(options: any): HookReturn {
        options.raw = true;
      }
    }
  });

  (usuario as any).associate = function (models: any): void {
    usuario.hasMany(models.imovel, {
      foreignKey: 'proprietario_id'
    })

    usuario.hasMany(models.locacao, {
      foreignKey: 'locador_id'
    })
  };

  return usuario;
}
