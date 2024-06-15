import { Sequelize, DataTypes, Model } from 'sequelize';
import { Application } from '../declarations';
import { HookReturn } from 'sequelize/types/hooks';

export default function (app: Application): typeof Model {
  const sequelizeClient: Sequelize = app.get('sequelizeClient');
  const locacao = sequelizeClient.define('locacao', {

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

    locador_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      references: {
        model: 'usuario',
        key: 'id'
      }
    },

    dataIni: {
      type: DataTypes.DATE,
      allowNull: false
    },

    dataFim: {
      type: DataTypes.DATE,
      allowNull: false
    },

    estaConfirmado: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }

  }, {
    hooks: {
      beforeCount(options: any): HookReturn {
        options.raw = true;
      }
    }
  });

  //associações entre entidades
  (locacao as any).associate = function (models: any): void {
    locacao.belongsTo(models.usuario, {
      foreignKey: 'locador_id',
      constraints: true
    })

    locacao.hasMany(models.avaliacao, {
      foreignKey: 'locacao_id'
    })

    locacao.belongsTo(models.imovel, {
      foreignKey: 'imovel_id',
      constraints: true
    })
  };

  return locacao;
}
