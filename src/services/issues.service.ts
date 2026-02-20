import { Issue, IssueStatusEnum } from "../models/issue.models";

class IssueService {

  async create(data: ICreateIssue) {
    return Issue.create({
      title: data.title,
      description: data.description,
      status: data.status ?? IssueStatusEnum.OPEN,
      user_id: data.user_id,
    });
  }

  async getAll() {
    return Issue.findAll();
  }

  async getById(id: number) {
    return Issue.findByPk(id);
  }

  async update(id: number, data: any) {
    const issue = await Issue.findByPk(id);

    if (!issue) return null;
    await issue.update({
      title: data.title,
      description: data.description,
      status: data.status,
    });
    return issue;
  }

  async delete(id: number) {
    const deletedCount = await Issue.destroy({
      where: { id },
    });
    return deletedCount > 0;
  }
}

export const issueService = new IssueService();

export interface ICreateIssue {
  title: string;
  description: string;
  status?: IssueStatusEnum;
  user_id: string;
}

export interface IUpdateIssue {
  title?: string;
  description?: string;
  status?: IssueStatusEnum;
  user_id?: string;
}
