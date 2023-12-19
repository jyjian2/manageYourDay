import { useState, useEffect } from 'react'
import Note from './components/Note'
import noteService from './services/notes.js'
import Notification from './components/Notification'
import Footer from './components/Footer'
import loginService from './services/login'



const App = () => {

  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState('YOU HAVE AN ERROR!')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }


    useEffect(() => {
      noteService
        .getAll()
        .then(initialNotes => {
          setNotes(initialNotes)
          //initial state will be ignore after react component render
          //render time: change in their state or props
        })
    }, [])

    const handleLogin = (event) => {
      event.preventDefault()
      console.log('logging in with', username, password)
    }

    const toggleImportanceOf = (id) => {
      const url = `/notes/${id}`
      const note = notes.find(n => n.id === id)
      const changedNote = { ...note, important: !note.important }
      note.important = !note.important

      noteService
        .update(id, changedNote)
        .then(returnedNote => {
          setNotes(notes.map(n => n.id != id ? n : returnedNote))
        })
        .catch(error => {
          setErrorMessage(
            `Note '${note.content}' has already removed from server`
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })

    }

    const notesToShow = showAll
      ? notes : notes.filter(note => note.important)

    const addNote = (event) => {
      event.preventDefault();
      const noteObject = {
        content: newNote,
        important: Math.random() < 0.5,
      }

      //send new note object to server
      noteService.create(noteObject)
        .then(returnedNote => {
          setNotes(notes.concat(returnedNote))
          setNewNote('')
        })
    }

    const handleNoteChange = (event) => {
      setNewNote(event.target.value)
    }

    const loginForm = () => (
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    )

    const noteForm = () => (
      <form onSubmit={addNote}>
        <input
          value={newNote}
          onChange={handleNoteChange}
        />
        <button type="submit">save</button>
      </form>
    )

    return (
      <div>
        <h1>Notes</h1>
        <Notification message={errorMessage} />
        {!user && loginForm()}
        {user &&
          <div>
            <p>{user.name} logged in</p>
            {noteForm()}
          </div>
        }
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>

        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
        <ul>
          {/*pass note.id as props because the whole notes need to be rerendered.
        Use note.id to check if the note's importance should be toggled */}
          {notesToShow.map(note => <Note key={note.id} note={note} toggleImportance={() => toggleImportanceOf(note.id)} />)}
        </ul>

        <form onSubmit={addNote}>
          <input value={newNote}
            onChange={handleNoteChange} />
          <button type="submit">save</button>
        </form>
        <Footer />
      </div>
    )
  }
}
export default App
