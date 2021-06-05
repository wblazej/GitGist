export interface File {
    name: string,
    language: string;
}

export interface Gist {
    id: string,
    createdAt: Date,
    description: string,
    isPublic: boolean,
    filesCount: number,
    files: File[]
}

export default {}