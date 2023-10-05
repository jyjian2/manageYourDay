import { useState } from 'react'
import viteLogo from '/vite.svg'

const Note = ({note}) => {
    return (
        <li>{note.content}</li>
    )
}

export default Note;