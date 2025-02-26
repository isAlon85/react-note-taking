/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-unused-vars */
import { Note } from './App'
import { Navigate, Outlet, useOutletContext, useParams } from 'react-router-dom'

type NoteLayoutProps = {
  notes: Note[]
}

export default function NoteLayout({ notes }: NoteLayoutProps): JSX.Element {
  const { id } = useParams()
  const note = notes.find((note) => note.id === id)

  if (note == null) {
    return <Navigate to='/' replace />
  }

  return <Outlet context={note} />
}

export function useNote() {
  return useOutletContext<Note>()
}
