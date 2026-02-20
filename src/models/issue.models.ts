import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/database";

export enum IssueStatusEnum {
  OPEN = "OPEN",
  IN_PROGRESS = "IN_PROGRESS",
  CLOSED = "CLOSED",
}

export interface IssueAttributes {
  id: number;
  title: string;
  description?: string;
  status: IssueStatusEnum;
  user_id: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface IssueCreationAttributes
  extends Optional<IssueAttributes, "id" | "createdAt" | "updatedAt"> { }

export class Issue
  extends Model<IssueAttributes, IssueCreationAttributes>
  implements IssueAttributes {
  public id!: number;
  public title!: string;
  public description?: string;
  public status!: IssueStatusEnum;
  public user_id!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Issue.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    status: {
      type: DataTypes.ENUM(...Object.values(IssueStatusEnum)),
      allowNull: false,
      defaultValue: IssueStatusEnum.OPEN,
    },

    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  
  {
    sequelize,
    tableName: "issues",
    timestamps: true,
  }
);
