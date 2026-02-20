import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(process.env.DATABASE_URL as string, {
  dialect: "postgres",
  logging: false,
});

sequelize
  .authenticate()
  .then(() => console.log("DB Connected"))
  .catch((err) => console.error("DB Error:", err));

sequelize
  .query("SELECT current_database();")
  .then(([result]) => console.log("Current Database:", result))
  .catch((err) => console.error(err));
