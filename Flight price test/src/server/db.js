import { Sequelize, DataTypes } from "sequelize";

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./users.db",
});

try {
  sequelize.authenticate();
  console.log("Connected to the database");
} catch (error) {
  console.error;
  ("Unable to connect to the database.");
}

const User = sequelize.define("User", {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unqiue: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export { sequelize, User };
