import { ChangeEvent, useState } from 'react';
import logo from './assets/LogoNLWExpert.svg'
import NewNoteCard from './components/new-note-card'
import NoteCard from './components/note-card'

interface Note {
  id: string,
  date: Date,
  content: string
}

function App() {
  
  const [search, setSearch] = useState<string>('')
  const [notes, setNotes] = useState<Note[]>(()=>{
    const notesOnStorage = localStorage.getItem('notes')
    
    if(notesOnStorage){
      return JSON.parse(notesOnStorage)
    }
    return []
  })

  function onNewNoteCreated(content: string){
    const newNote = {
      id: crypto.randomUUID(),
      date: new Date(),
      content
    }
    
    const notesArray = [newNote, ...notes]
    setNotes(notesArray)

    localStorage.setItem('notes', JSON.stringify(notesArray))
  }

  function onDeleteNote(id: string) {
    const notesArray = notes.filter((note)=>{
      return note.id !== id
    })
    setNotes(notesArray)
    localStorage.setItem('notes', JSON.stringify(notesArray))
  }

  function handleSearch (event: ChangeEvent<HTMLInputElement>) {
    const query = event.target.value 
    setSearch(query)
  }

  const filteredNotes = search != '' ? notes.filter(note=> note.content.toLocaleLowerCase().includes(search.toLocaleLowerCase())) : notes

  return (
    <div className='mx-auto max-w-6xl my-12 space-y-6 px-5 md:px-0'>
      <img src={logo} alt="nlw-logo" />

      <form className='w-full'>
        <input 
          type="text" 
          placeholder='Busque em suas notas...' 
          className='w-full bg-transparent text-3xl font-semibold tracking-tight placeholder:text-slate-500 outline-none'
          onChange={handleSearch}
        />
      </form>

      <div className='h-px bg-slate-700'/>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[250px]'>
        <NewNoteCard  onNewNoteCreated={onNewNoteCreated} />
        {filteredNotes.map((note)=>{
          return <NoteCard key={note.id} note={note} onDeleteNote={onDeleteNote} />
        })}
      </div>
    </div>
  )
    
}

export default App
