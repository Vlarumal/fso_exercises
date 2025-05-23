const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../utils/db');

class ReadingList extends Model {}

ReadingList.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    blogId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'blogs', key: 'id' },
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'users', key: 'id' },
    },
    read: {
      type: DataTypes.STRING,
      defaultValue: false,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: true,
    modelName: 'readingList',
  }
);

module.exports = ReadingList;
