import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'

import GistsWrapper from './../ts/gistsWrapper'
import { IGist, IFile } from './../ts/interfaces';
import './../style/main.css'
import LanguagesIcons from './../components/Languages';

const Main: React.FC<{wrapper: GistsWrapper}> = ({wrapper}) => {
    const [gistsList, setGistsList] = useState(Array<IGist>())
    const [loaded, setLoaded] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)

    useEffect(() => {
        wrapper.getGists(3, currentPage)
        .then(response => {
            if (response.status === 200) {
                const gists: IGist[] = []

                response.data.forEach((data: any) => {
                    const files: IFile[] = []
                    
                    Object.keys(data.files).forEach((key: string) => {
                        files.push({
                            name: data.files[key].filename,
                            language: data.files[key].language,
                            content: data.files[key].content
                        })
                    })

                    gists.push({
                        id: data.id,
                        createdAt: data.created_at,
                        description: data.description,
                        isPublic: data.public,
                        files: files
                    })
                })

                setGistsList(gists)
                setLoaded(true)
            }
        })
    }, [wrapper, currentPage])

    return (
        <div className="gists-container">
            <div className="buttons-panel">
                <div className="button" title="Previous page" 
                    onClick={() => setCurrentPage(currentPage => currentPage !== 1 ? currentPage - 1 : 1)}>
                    <i className="fa-solid fa-arrow-left"></i>
                </div>
                <div className="page" title="Current page">{currentPage}</div>
                <div className="button" title="Next page" 
                    onClick={() => setCurrentPage(currentPage => currentPage + 1)}>
                    <i className="fa-solid fa-arrow-right"></i>
                </div>
            </div>

            { gistsList.length > 0 &&
                <div className="gists">
                    { gistsList.map((gist: IGist, key: number) => (
                        <Link to={`/gists/${gist.id}`} className="gist" key={key}>
                            <h3>{gist.description}</h3>
                            <span className="gist-info">{gist.files.length} {gist.files.length === 1 ? "file" : "files"}</span>
                            { !gist.isPublic && <span className="gist-info private">private</span> }
                            
                            <div className="files">
                                { gist.files.map((file: IFile, i: number) => (
                                    <div className="file" key={i}>
                                        <LanguagesIcons lang={file.language ? file.language : ""} />
                                        <span className="filename">{file.name}</span>
                                    </div>
                                ))}
                            </div>
                        </Link>
                    ))}
                </div>
            }
            { gistsList.length === 0 && loaded && 
                <p className="page-info">No more gists</p>
            }
        </div>
    )
}

export default Main;