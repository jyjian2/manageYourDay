import { useState } from 'react'
import viteLogo from '/vite.svg'

const Note = ({ note, toggleImportance }) => {
    const label = note.important ? 'make it not important' : 'make it important'

    return (
        <>
            <li className="note">{note.content}</li>
            <button onClick={toggleImportance}>{label}</button>
        </>

    )
}

export default Note;