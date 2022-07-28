const { Sequelize, DataTypes } = require('sequelize');

const { DATABASE, USERNAME, PASSWORD, HOST, DIALECT, DB_PORT } = process.env;
const sequelize = new Sequelize(DATABASE, USERNAME, PASSWORD, {
  host: HOST,
  dialect: DIALECT,
  port: DB_PORT,
});

const User = sequelize.define(
  'user',
  {
    userId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        not: {
          msg: "username shouldn't have any whitespace",
          args: /\s/,
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
  },
  {
    timestamps: true,
  }
);

const Process = sequelize.define(
  'process',
  {
    processId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);
const ProcessStep = sequelize.define(
  'process_step',
  {
    process_stepId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    duration: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    people: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    process_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);
Process.belongsTo(User, {
  foreignKey: 'user_id',
});
User.hasMany(Process, {
  foreignKey: 'user_id',
});

ProcessStep.belongsTo(Process, {
  foreignKey: 'process_id',
});

Process.hasMany(ProcessStep, {
  foreignKey: 'process_id',
});

sequelize.sync().then(() => {
  console.log('altered'.green);
});

module.exports = { Process, User, ProcessStep };
