/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-unused-vars */
import NoteForm from './NoteForm'
import { NoteData, Tag } from './App'

type NewNoteProps = {
  onSubmit: (data: NoteData) => void
  onAddTag: (tag: Tag) => void
  availableTags: Tag[]
}

export default function NewNote({ onSubmit, onAddTag, availableTags }: NewNoteProps): JSX.Element {
  return (
    <>
      <h1 className='mb-4'>New Note</h1>
      <NoteForm onSubmit={onSubmit} onAddTag={onAddTag} availableTags={availableTags} />
    </>
  )
}
