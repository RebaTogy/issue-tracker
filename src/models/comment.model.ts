import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database";

export class Comment extends Model { }

Comment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    issue_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "issues",
        key: "id",
      },
    },

    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },
  },

  {
    sequelize,
    tableName: "comments",
    timestamps: true,
  }
);
