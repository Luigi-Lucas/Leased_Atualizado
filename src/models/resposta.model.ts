import { Sequelize, DataTypes, Model } from 'sequelize';
import { Application } from '../declarations';
import { HookReturn } from 'sequelize/types/hooks';

export default function (app: Application): typeof Model {
  const sequelizeClient: Sequelize = app.get('sequelizeClient');
  const resposta = sequelizeClient.define('resposta', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },

    proprietario_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      references: {
        model: 'usuario',
        key: 'id'
      }
    },

    duvida_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      references: {
        model: 'duvida',
        key: 'id'
      }
    },

    texto: {
      type: DataTypes.STRING,
      allowNull: false
    },

    dataEnvio: {
      type: DataTypes.DATE,
      allowNull: false
    },

  }, {
    hooks: {
      beforeCount(options: any): HookReturn {
        options.raw = true;
      }
    }
  });

  (resposta as any).associate = function (models: any): void {
    resposta.belongsTo(models.usuario, {
      foreignKey: 'proprietario_id',
      constraints: true
    })

    resposta.belongsTo(models.duvida, {
      foreignKey: 'duvida_id',
      constraints: true
    })
  };

  return resposta;
}
