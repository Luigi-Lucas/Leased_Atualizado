import { Sequelize, DataTypes, Model } from 'sequelize';
import { Application } from '../declarations';
import { HookReturn } from 'sequelize/types/hooks';

export default function (app: Application): typeof Model {
  const sequelizeClient: Sequelize = app.get('sequelizeClient');
  const imovel = sequelizeClient.define('imovel', {

    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },

    proprietario_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: false,
      references: {
        model: 'usuario',
        key: 'id'
      }
    },


    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    endereco: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    tipo: {
      type: DataTypes.STRING
    },

    imagens: {
      type: DataTypes.BLOB,
      allowNull: true
    },

    videos: {
      type: DataTypes.STRING,
      allowNull: true
    },

    qtdQuartos: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    maxPessoas: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    precoPadrao: {
      type: DataTypes.DECIMAL,
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

  (imovel as any).associate = function (models: any): void {
    imovel.belongsTo(models.usuario, {
      foreignKey: 'proprietario_id',
      constraints: true
    })

    imovel.hasMany(models.locacao, {
      foreignKey: 'imovel_id'
    })

    imovel.hasMany(models.pacote, {
      foreignKey: 'imovel_id'
    })

    imovel.hasOne(models.anuncio, {
      foreignKey: 'anuncio_id',
      constraints: true
    })

    imovel.hasMany(models.duvida, {
      foreignKey: 'imovel_id'
    })
  };

  return imovel;
}
