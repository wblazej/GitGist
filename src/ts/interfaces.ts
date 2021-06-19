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

export default {}