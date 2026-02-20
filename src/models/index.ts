import { sequelize } from "../config/database";
import { User } from "./user.model";
import { Issue } from "./issue.models";
import { Comment } from "./comment.model";
import { StatusHistory } from "./statusHistory.model";

User.hasMany(Issue, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

Issue.belongsTo(User, {
  foreignKey: "user_id",
});

Issue.hasMany(Comment, {
  foreignKey: "issue_id",
  as: "comments",
  onDelete: "CASCADE",
});

Comment.belongsTo(Issue, {
  foreignKey: "issue_id",
  as: "issue",
});

User.hasMany(Comment, {
  foreignKey: "user_id",
  as: "comments",
  onDelete: "CASCADE",
});

Comment.belongsTo(User, {
  foreignKey: "user_id",
  as: "user",
});

Issue.hasMany(StatusHistory, {
  foreignKey: "issue_id",
  as: "statushistory",
  onDelete: "CASCADE",
});

StatusHistory.belongsTo(Issue, {
  foreignKey: "issue_id",
  as: "issue",
});

export {
  sequelize,
  User,
  Issue,
  Comment,
  StatusHistory,
};