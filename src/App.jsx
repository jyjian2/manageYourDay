import { useState, useEffect } from 'react'
import axios from 'axios'
import Note from './components/Note'



const App = () => {

  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)

  useEffect(() => {
    console.log(notes.length)
    console.log("effect");
    axios
    .get("http://localhost:3001/notes")
    .then( response => {
      console.log("Promise fulfilled");
      console.log(response.data)
      setNotes(response.data)
      //initial state will be ignore after react component render
      //render time: change in their state or props
    })
  }, [])
  console.log('render', notes.length, 'notes')


  const notesToShow = showAll
  ? notes : notes.filter(note => note.important)

  const addNote = (event) => {
    event.preventDefault();
    const newObject = {
      content: newNote,
      important: Math.random() < 0.5,
      id: notes.length + 1
    }
    setNotes(notes.concat(newObject))
    setNewNote('')
  }

  const handleNoteChange = (event) => {
    setNewNote(event.target.value)
  }
  
  return (
    <div>
      <h1>Notes</h1>
      <button onClick={()=>setShowAll(!showAll)}>
        show {showAll ? 'important' : 'all'}
      </button>
      <ul>
        {console.log(notesToShow)}
        {notesToShow.map(note => <Note key={note.id} note={note}/>)}
      </ul>

      <form onSubmit={addNote}>
        <input value={newNote} 
              onChange={handleNoteChange}/>
        <button type="submit">save</button>
      </form>
    </div>
  )
}

export default App
