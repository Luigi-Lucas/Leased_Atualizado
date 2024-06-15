import { Sequelize, DataTypes, Model } from 'sequelize';
import { Application } from '../declarations';
import { HookReturn } from 'sequelize/types/hooks';

export default function (app: Application): typeof Model {
  const sequelizeClient: Sequelize = app.get('sequelizeClient');
  const pacote = sequelizeClient.define('pacote', {

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

    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    dataIni: {
      type: DataTypes.DATE,
      allowNull: false
    },

    dataFim: {
      type: DataTypes.DATE,
      allowNull: false
    },

    somenteFinalDeSemana: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },

    preco: {
      type: DataTypes.DECIMAL,
      allowNull: false
    }

  }, {
    hooks: {
      beforeCount(options: any): HookReturn {
        options.raw = true;
      }
    }
  });

  (pacote as any).associate = function (models: any): void {
    pacote.belongsTo(models.imovel, {
      foreignKey: 'imovel_id',
      constraints: true
    })
  };

  return pacote;
}
