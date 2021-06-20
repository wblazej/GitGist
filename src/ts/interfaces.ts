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

export interface IDisplayGist {
    createdAt: string,
    description: string,
    isPublic: boolean,
    files: IDisplayFile[]
}

export interface IDisplayFile {
    name: string;
    language: string;
    content: string;
}

export default {}