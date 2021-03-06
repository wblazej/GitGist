import axios, { AxiosInstance } from 'axios';

class GistsWrapper {
    token: string;
    client: AxiosInstance

    constructor(token: string) {
        this.token = token
        this.client = axios.create({
            baseURL: 'https://api.github.com/',
            responseType: 'json',
            headers: {
                'Accept': 'application/vnd.github.v3+json',
                'Authorization': 'token ' + this.token
            }
        })
    }

    validate = () => this.client.get('/user')

    getGist = (gistID: string) => this.client.get(`/gists/${gistID}`)

    getGists = (perPage: number = 10, page: number = 1) =>
        this.client.get('/gists', {
            params: {
                per_page: perPage,
                page: page,
                timestamp: new Date().getTime()
            }
        })

    createGist = (description: string, isPublic: boolean, files: object) =>
        this.client.post('/gists', {
            description: description,
            public: isPublic,
            files: files
        })

    deleteGist = (gistID: string) => this.client.delete(`/gists/${gistID}`)

    updateGist = (gistID: string, description: string, files: object) =>
        this.client.patch(`/gists/${gistID}`, {
            description: description,
            files: files
        })
}

export default GistsWrapper;
