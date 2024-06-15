import { Sequelize, DataTypes, Model } from 'sequelize';
import { Application } from '../declarations';
import { HookReturn } from 'sequelize/types/hooks';

export default function (app: Application): typeof Model {
  const sequelizeClient: Sequelize = app.get('sequelizeClient');
  const avaliacao = sequelizeClient.define('avaliacao', {

    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },

    locacao_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      references: {
        model: 'locacao',
        key: 'id'
      }
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

    qtdEstrelas: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    dataAvaliacao: {
      type: DataTypes.DATE,
      allowNull: false
    },

    texto: {
      type: DataTypes.STRING,
      allowNull: false
    },

    imagens: {
      type: DataTypes.BLOB,
      allowNull: true
    },

    videos: {
      type: DataTypes.STRING,
      allowNull: true
    }

  }, {
    hooks: {
      beforeCount(options: any): HookReturn {
        options.raw = true;
      }
    }
  });

  (avaliacao as any).associate = function (models: any): void {
    avaliacao.belongsTo(models.locacao, {
      foreignKey: 'locacao_id',
      constraints: true
    })

    avaliacao.belongsTo(models.usuario, {
      foreignKey: 'usuario_id',
      constraints: true
    })
  };

  return avaliacao;
}
