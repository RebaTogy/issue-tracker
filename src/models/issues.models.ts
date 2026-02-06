
export interface Issue{
    id : number;
    title : string;
    description ?: string;
    status : IssueStatusEnum;
    createdAt : string;
}

export enum IssueStatusEnum {
    OPEN = "OPEN",
    IN_PROGRESS = "IN_PROGRESS",
    CLOSED = "CLOSED"
}