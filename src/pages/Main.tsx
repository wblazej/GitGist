import React from 'react';
import GistsWrapper from './../ts/gistsWrapper'
import './../style/main.css'
import PythonIcon from './../img/langIcons/Python';
import { Link } from 'react-router-dom'
import { Gist, File } from './../ts/interfaces';

interface IProps {
    wrapper: GistsWrapper
}

interface IState {
    gists: Gist[]
}

class Main extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props)

        this.state = {
            gists: []
        }
    }

    componentDidMount() {
        this.props.wrapper.getGists(null, 5, 1)
        .then(response => {
            if (response.status === 200) {
                const gists: Gist[] = []

                response.data.forEach((data: any) => {
                    const files: File[] = []
                    
                    Object.keys(data.files).forEach((key: string) => {
                        files.push({
                            name: data.files[key].filename,
                            language: data.files[key].language
                        })
                    })

                    gists.push({
                        id: data.id,
                        createdAt: data.created_at,
                        description: data.description,
                        isPublic: data.public,
                        filesCount: files.length,
                        files: files
                    })
                })

                this.setState({gists: gists})
            }
        })
    }

    render() {
        return (
            <div className="gists-container">
                { this.state.gists.map((gist: Gist, key: number) => (
                    <Link to={`/gists/${gist.id}`} className="gist" key={key}>
                        <h3>{gist.description}</h3>
                        <span className="gist-info">{gist.filesCount} {gist.filesCount === 1 ? "file" : "files"}</span>
                        { !gist.isPublic && <span className="gist-info private">private</span> }
                        
                        <div className="files">
                            <div className="file">
                                <PythonIcon/>
                                <span className="filename">test.py</span>
                            </div>
                            <div className="file">
                                <PythonIcon/>
                                <span className="filename">test.py</span>
                            </div>
                        </div>
                    </Link>
                ))}
                <></>
            </div>
        )
    }
}

export default Main;