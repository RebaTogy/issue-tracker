import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/database";
import { IssueStatusEnum } from "./issue.models";

interface StatusHistoryAttributes {
  user_id: string;
  id: number;
  issue_id: number;
  old_status?: IssueStatusEnum;
  new_status: IssueStatusEnum;
  changed_at?: Date;
}

interface StatusHistoryCreationAttributes
  extends Optional<StatusHistoryAttributes, "id" | "changed_at" | "old_status"> { }

export class StatusHistory
  extends Model<StatusHistoryAttributes, StatusHistoryCreationAttributes>
  implements StatusHistoryAttributes {
  public user_id!: string;
  public id!: number;
  public issue_id!: number;
  public old_status?: IssueStatusEnum;
  public new_status!: IssueStatusEnum;
  public readonly changed_at!: Date;
}

StatusHistory.init(
  {
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },

    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    issue_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "issues",
        key: "id",
      },
    },
    
    old_status: {
      type: DataTypes.ENUM(...Object.values(IssueStatusEnum)),
      allowNull: true,
    },

    new_status: {
      type: DataTypes.ENUM(...Object.values(IssueStatusEnum)),
      allowNull: false,
    },

    changed_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },

  {
    sequelize,
    tableName: "status_history",
    timestamps: false,
  }
);
