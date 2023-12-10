
import { useState } from 'react'
import './App.css'
import { useEffect } from 'react';
import noteService from "./services/notes";

function App() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");

  useEffect(() => {
    noteService
     .getNotes()
     .then((initialNotes) => setNotes(initialNotes))
  }, []);


  const addNote = (event) => {
    event.preventDefault();

    const noteObject ={
      content: newNote,
    };

    noteService.addNote(noteObject).then(returnedNote => {
      setNotes(notes.concat(returnedNote))
      setNewNote("");
    });
  };

  const deleteNote = (id) => {
    noteService.deleteNote(id).then((res) => {
      if (res.status === 204) {
        setNotes(notes.filter((note) => note.id !== id));
      }
    });
  };

  const toggleImportanceOf = (id) => {
    const note = notes.find((note) => note.id === id);
    const changedNote = {
      ...note,
      important: !note.important,
    };

    noteService
     .updateNote(id, changedNote)
     .then((updatedNote) => 
       setNotes(notes.map((note) => (note.id !== id ? note : updatedNote)))
      );
  };
 
  const handleNoteChange = (event) => {
    setNewNote(event.target.value);
  };


  return (
    <div>
      <h1>Notes App</h1>
      <ul>
        {notes.map((note) => (
          <li key={note.id}>
            {note.content}{" "} 
            <button onClick={() => toggleImportanceOf(note.id)}>
              {note.important ? "make not important" : "make important"}
            </button>
            <button onClick={() => deleteNote(note.id)}>x</button>
          </li>
        ))}
      </ul>
      <form onSubmit={addNote}>
        <input type="text"  value={newNote} onChange={handleNoteChange}/>
        <button type='submit'>save</button>
      </form>
    </div>
  )
}

export default App
