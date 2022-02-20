export interface IFile {
    name: string,
    language: string | null;
    content: string;
}

export interface IGist {
    id: string,
    createdAt: string,
    description: string,
    isPublic: boolean,
    files: IFile[]
}

export interface IEditableFile {
    name: string;
    content: string;
    deleted: boolean;
}
