import React, { useEffect, useState } from "react";
import { LightAsync as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vs2015 as theme } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { useParams, Link, useHistory } from "react-router-dom";

import gistsWrapper from './../ts/gistsWrapper';
import './../style/gist.css'
import Languages from './../components/Languages';
import { IGist, IFile } from './../ts/interfaces';
import convertDate from './../ts/convertDate';
import toast from "react-hot-toast";


const Gist: React.FC<{ wrapper: gistsWrapper }> = ({ wrapper }) => {
    const [gist, setGist] = useState<IGist>()

    const { id: gistID } = useParams<{ id: string }>()
    const history = useHistory()

    useEffect(() => {
        wrapper.getGist(gistID)
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
                        id: gistID,
                        createdAt: response.data.created_at,
                        description: response.data.description,
                        isPublic: response.data.public,
                        files: files
                    })
                }
            })
            .catch(error => {
                if (error.response.status === 401)
                    toast.error("You didn't provide any token or it's incorrect")
                else if (error.response.status === 404)
                    toast.error("Gist with this ID doesn't exist")
            })
    }, [gistID, wrapper]) // eslint-disable-line react-hooks/exhaustive-deps

    const getLinesCounter = (lines: number) => {
        let linesCounter: Array<JSX.Element> = []
        for (let i = 0; i < lines; i++) {
            linesCounter.push(<div key={i}>{i + 1}</div>)
        }
        return linesCounter;
    }

    const deleteGist = () => {
        wrapper.deleteGist(gistID)
            .then(response => {
                if (response.status === 204) {
                    toast.success("Gist has been successfully deleted")
                    history.push('/')
                }
            })
    }

    if (gist)
        return (
            <div className="display-gist">
                <div className="header">
                    <span className="description">{gist.description}</span>
                    {!gist.isPublic && <span className="private">private</span>}
                    <span className="date">{convertDate(gist.createdAt)}</span>
                    <div className="buttons">
                        <Link to={`/edit/${gistID}`} className="button">
                            <i className="fa-solid fa-pen-to-square"></i>
                        </Link>

                        <div className="button" onClick={deleteGist}>
                            <i className="fa-solid fa-trash"></i>
                        </div>
                    </div>
                </div>

                {gist.files.map((file: IFile, i: number) => (
                    <div className="code-block" key={i}>
                        <div className="file-header">
                            <Languages lang={file.language ? file.language : ""} />
                            <span>{file.name}</span>
                        </div>
                        <div className="lines-counter">
                            {getLinesCounter((file.content.match(/\n/g) || []).length + 1)}
                        </div>
                        <SyntaxHighlighter language={file.language ? file.language.toLowerCase() : ""} style={theme}>
                            {file.content}
                        </SyntaxHighlighter>
                    </div>
                ))}
            </div>
        )
    else return <></>
}

export default Gist;
