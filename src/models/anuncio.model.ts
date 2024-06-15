import { Sequelize, DataTypes, Model } from 'sequelize';
import { Application } from '../declarations';
import { HookReturn } from 'sequelize/types/hooks';

export default function (app: Application): typeof Model {
  const sequelizeClient: Sequelize = app.get('sequelizeClient');
  const anuncio = sequelizeClient.define('anuncio', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
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

    ativo: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },

    titulo: {
      type: DataTypes.STRING,
      allowNull: false
    },

    descricao: {
      type: DataTypes.TEXT,
      allowNull: false
    }

  }, {
    hooks: {
      beforeCount(options: any): HookReturn {
        options.raw = true;
      }
    }
  });

  (anuncio as any).associate = function (models: any): void {
    anuncio.belongsTo(models.imovel, {
      foreignKey: 'imovel_id',
      constraints: true
    })
  };

  return anuncio;
}
