import { Issue, IssueStatusEnum } from "../models/issues.models";
let issues: Issue[] = [];
let currentId = 1;

class IssueService {
    create(data: ICreateIssue): Issue {
        const issue: Issue = {
            id: currentId++,
            title: data.title,
            description: data.description,
            status: data.status || IssueStatusEnum.OPEN,
            createdAt: new Date().toISOString(),
        };
        issues.push(issue);
        return issue;
    }

    getAll(): Issue[] {
        return issues;
    }
    getById(id: number): Issue | undefined {
        return issues.find(issue => issue.id === id);
    }

    update(id: number, data: IUpdateIssue): Issue | null {
        const issue = issues.find(i => i.id === id);
        if (!issue) return null;


        if (data.title !== undefined) {
            issue.title = data.title;
        }

        if (data.description !== undefined) {
            issue.description = data.description;
        }

        if (data.status !== undefined) {
            issue.status = data.status;
        }
        return issue;
    }

    delete(id: number): boolean {
        const lengthBefore = issues.length;

        issues = issues.filter(i => i.id !== id);

        return issues.length !== lengthBefore;
    }

}

export const issueService = new IssueService();




export interface ICreateIssue {
    title: string;
    description?: string;
    status?: IssueStatusEnum;
}

export interface IUpdateIssue {
    title?: string;
    description?: string;
    status?: IssueStatusEnum;
}
