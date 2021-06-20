import React, { useState, useEffect } from "react";
import gistWrapper from './../ts/gistsWrapper';
import { IEditableFile } from './../ts/interfaces';
import TrashIcon from './../img/icons/Trash';
import { useParams, useHistory } from "react-router-dom";

interface IParams {
    id: string;
}

interface IProps {
    wrapper: gistWrapper,
    throwMessage: Function
}

const EditGist: React.FunctionComponent<IProps> = (props: IProps) => {
    const params = useParams<IParams>()
    const history = useHistory()

    const [beforeUpdateFilesState, setBeforeUpdateFilesState] = useState(Array<IEditableFile>())
    const [files, setFiles] = useState(Array<IEditableFile>())
    const [description, setDescription] = useState("")
    const [isPublic, setIsPublic] = useState(false)

    const descriptionHandler = (Event: React.FormEvent<HTMLInputElement>) =>
        setDescription(Event.currentTarget.value)

    const isPublicHandler = (Event: React.FormEvent<HTMLInputElement>) =>
        setIsPublic(Event.currentTarget.checked)

    const addFile = () =>
        setFiles(files => [...files].concat({name: "", content: "", deleted: false}))

    const filenameHandler = (value: string, i: number) =>
        setFiles(files => files.map((item: IEditableFile, index: number) => index === i ? {...item, name: value} : item))

    const contentHandler = (value: string, i: number) =>
        setFiles(files => files.map((item: IEditableFile, index: number) => index === i ? {...item, content: value} : item))

    const removeFile = (i: number) =>
    setFiles(files => files.map((item: IEditableFile, index: number) => index === i ? {...item, deleted: true} : item))

    useEffect(() => {
        props.wrapper.getGist(params.id)
        .then(response => {
            if (response.status === 200) {
                const files: IEditableFile[] = []
                
                Object.keys(response.data.files).forEach((key: string) => {
                    files.push({
                        name: response.data.files[key].filename,
                        content: response.data.files[key].content,
                        deleted: false
                    })
                })

                setDescription(response.data.description)
                setIsPublic(response.data.public)
                setFiles(files)
                setBeforeUpdateFilesState(files)
            }
        })
    }, [params.id])

    const update = (Event: React.FormEvent) => {
        Event.preventDefault()
        
        if (description.length === 0)
            return props.throwMessage("failure", "Description cannot be blank")

        if (files.filter((file: IEditableFile) => !file.deleted).length === 0)
            return props.throwMessage('failure', "Add at least one file")

        files.forEach((value: IEditableFile, index: number) => {
            if (value.name.length === 0)
                return props.throwMessage('failure', `Filename cannot be blank in file ${index + 1}`)
            if (value.content.length === 0)
                return props.throwMessage('failure', `File content cannot be blank in file ${index + 1}`)
        })

        let filesObject: any = {}
        beforeUpdateFilesState.forEach((value: IEditableFile, i: number) => {
            if (files[i].deleted)
                filesObject[value.name] = {content: ""}
            else
                filesObject[value.name] = {content: files[i].content, filename: files[i].name}
        })

        props.wrapper.updateGist(params.id, description, isPublic, filesObject)
        .then(response => {
            if (response.status === 200) {
                props.throwMessage('success', "Gist has been successfully updated")
                history.push(`/gists/${params.id}`)
            }
        })
    }

    return (
        <div className="add-new-gist">
            <form onSubmit={update}>
                <div className="header">
                    <input type="text" placeholder="Gist description..." className="description" value={description} onChange={descriptionHandler} />
                    <span className="private">Private</span>
                    <div className="switch-button">
                        <input 
                            type="checkbox" id="is-public" checked={isPublic} 
                            onChange={isPublicHandler} 
                        />
                        <label htmlFor="is-public"></label>
                    </div>
                </div>

                { files.map((file: IEditableFile, i: number) => (
                    <div className="new-file" key={i}>
                        { !file.deleted &&
                            <>
                                <div className="settings">
                                    <input 
                                        type="text" placeholder="File name" value={file.name} 
                                        onChange={(Event: React.FormEvent<HTMLInputElement>) => filenameHandler(Event.currentTarget.value, i)} 
                                    />
                                    <div className="remove-button" onClick={() => removeFile(i)}><TrashIcon/></div>
                                </div>
                                <textarea 
                                    value={file.content} 
                                    onChange={(Event: React.FormEvent<HTMLTextAreaElement>) => contentHandler(Event.currentTarget.value, i)}>
                                </textarea>
                                <span className="code-sign">code</span>
                            </>
                        }
                    </div>
                ))}
                

                <div className="buttons">
                    <div className="add-button" onClick={addFile}>Add file</div>
                    <input type="submit" value="Submit" />
                </div>
            </form>
        </div>
    )
}

export default EditGist;