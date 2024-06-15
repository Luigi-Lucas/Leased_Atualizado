import { Sequelize, DataTypes, Model } from 'sequelize';
import { Application } from '../declarations';
import { HookReturn } from 'sequelize/types/hooks';

export default function (app: Application): typeof Model {
  const sequelizeClient: Sequelize = app.get('sequelizeClient');
  const duvida = sequelizeClient.define('duvida', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },

    usuario_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      references: {
        model: 'usuario',
        key: 'id'
      }
    },

    imovel_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      references: {
        model: 'imovel',
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

  (duvida as any).associate = function (models: any): void {
    duvida.belongsTo(models.usuario, {
      foreignKey: 'usuario_id',
      constraints: true
    })

    duvida.belongsTo(models.imovel, {
      foreignKey: 'imovel_id',
      constraints: true
    })
  };

  return duvida;
}
