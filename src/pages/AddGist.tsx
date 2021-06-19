import React, { useState } from 'react';
import GistsWrapper from './../ts/gistsWrapper';
import './../style/addGist.css';
import { INewFile } from './../ts/interfaces';
import TrashIcon from './../img/icons/Trash';

interface IProps {
    wrapper: GistsWrapper
    throwMessage: Function;
}

const AddGist: React.FunctionComponent<IProps> = (props: IProps) => {
    const [files, setFiles] = useState(Array<INewFile>())
    const [description, setDescription] = useState("")
    const [isPublic, setIsPublic] = useState(false)

    const descriptionHandler = (Event: React.FormEvent<HTMLInputElement>) =>
        setDescription(Event.currentTarget.value)

    const isPublicHandler = (Event: React.FormEvent<HTMLInputElement>) =>
        setIsPublic(Event.currentTarget.checked)

    const addFile = () =>
        setFiles(files => [...files].concat({filename: "", content: ""}))

    const filenameHandler = (value: string, i: number) =>
        setFiles(files => files.map((item: INewFile, index: number) => index === i ? {...item, filename: value} : item))

    const contentHandler = (value: string, i: number) =>
        setFiles(files => files.map((item: INewFile, index: number) => index === i ? {...item, content: value} : item))

    const removeFile = (i: number) =>
        setFiles(files => files.filter((value: INewFile, index: number) => index !== i))

    const create = (Event: React.FormEvent) => {
        Event.preventDefault()
        
        if (description.length === 0)
            return props.throwMessage("failure", "Description cannot be blank")

        if (files.length === 0)
            return props.throwMessage('failure', "Add at least one file")

        files.forEach((value: INewFile, index: number) => {
            if (value.filename.length === 0)
                return props.throwMessage('failure', `Filename cannot be blank in file ${index + 1}`)
            if (value.content.length === 0)
                return props.throwMessage('failure', `File content cannot be blank in file ${index + 1}`)
        })

        let filesObject: any = {}
        files.forEach((value: INewFile) => {
            filesObject[value.filename] = {content: value.content}
        })

        console.log(filesObject)

        props.wrapper.createGist(description, isPublic, filesObject)
        .then(response => {
            if (response.status === 201)
                props.throwMessage('success', "Gist has been successfully created")
            setDescription("")
            setIsPublic(false)
            setFiles([])
        })
    }

    return (
        <div className="add-new-gist">
            <form onSubmit={create}>
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

                { files.map((file: INewFile, i: number) => (
                    <div className="new-file" key={i}>
                        <div className="settings">
                            <input 
                                type="text" placeholder="File name" value={file.filename} 
                                onChange={(Event: React.FormEvent<HTMLInputElement>) => filenameHandler(Event.currentTarget.value, i)} 
                            />
                            <div className="remove-button" onClick={() => removeFile(i)}><TrashIcon/></div>
                        </div>
                        <textarea 
                            value={file.content} 
                            onChange={(Event: React.FormEvent<HTMLTextAreaElement>) => contentHandler(Event.currentTarget.value, i)}>
                        </textarea>
                        <span className="code-sign">code</span>
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

export default AddGist;