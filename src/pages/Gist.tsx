import React, { useEffect, useState } from "react";
import gistsWrapper from './../ts/gistsWrapper';
import './../style/gist.css'
import { LightAsync as SyntaxHighlighter } from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import Languages from './../components/Languages';
import { IGist, IFile } from './../ts/interfaces';
import { useParams } from "react-router-dom";
import convertDate from './../ts/convertDate';
import TrashIcon from './../img/icons/Trash';
import EditIcon from './../img/icons/Edit';
import { useHistory } from 'react-router-dom';


interface IParams {
    id: string;
}

interface IProps {
    wrapper: gistsWrapper
    throwMessage: Function;
}

const Gist: React.FunctionComponent<IProps> = (props: IProps) => {
    const [gist, setGist] = useState<IGist>()

    const params = useParams<IParams>()
    const history = useHistory()

    useEffect(() => {
        props.wrapper.getGist(params.id)
        .then(response => {
            if (response.status === 200) {
                const files: IFile[] = []
                
                Object.keys(response.data.files).forEach((key: string) => {
                    files.push({
                        name: response.data.files[key].filename,
                        language: response.data.files[key].language,
                        content: response.data.files[key].content
                    })
                })

                setGist({
                    id: params.id,
                    createdAt: response.data.created_at,
                    description: response.data.description,
                    isPublic: response.data.public,
                    files: files
                })
            }
        })
    }, [props.wrapper, params.id])

    const getLinesCounter = (lines: number) => {
        let linesCounter: Array<JSX.Element> = []
        for (let i = 0; i < lines; i++) {
            linesCounter.push(<div key={i}>{i + 1}</div>)
        }
        return linesCounter;
    }

    const deleteGist = () => {
        props.wrapper.deleteGist(params.id)
        .then(response => {
            if (response.status === 204) {
                props.throwMessage('success', "Gist has been successfully deleted")
                history.push('/')
            }
        })
    }
    
    if (gist) {
        return (
            <div className="display-gist">
                <div className="header">
                    <span className="description">{gist.description}</span>
                    <span className="date">{convertDate(gist.createdAt)}</span>
                    <div className="buttons">
                        <div className="button"><EditIcon/></div>
                        <div className="button" onClick={deleteGist}><TrashIcon/></div>
                    </div>
                </div>

                { gist.files.map((file: IFile, i: number) => (
                    <div className="code-block" key={i}>
                        <div className="file-header">
                            <Languages lang={file.language ? file.language : ""} />
                            <span>{file.name}</span>
                        </div>
                        <div className="lines-counter">
                            {getLinesCounter((file.content.match(/\n/g) || []).length + 1)}
                        </div>
                        <SyntaxHighlighter language={file.language ? file.language.toLowerCase() : ""} style={docco}>
                            {file.content}
                        </SyntaxHighlighter>
                    </div>
                ))}
            </div>
        )
    }
    else return <></>
}

export default Gist;