export interface IFile {
    name: string,
    language: string;
}

export interface IGist {
    id: string,
    createdAt: Date,
    description: string,
    isPublic: boolean,
    filesCount: number,
    files: IFile[]
}

export interface INewFile {
    filename: string;
    content: string;
}

export interface IMessage {
    content: string;
    status: string;
    shown: boolean;
    hiding: boolean;
}

export default {}