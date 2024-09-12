/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-unused-vars */
import { useNote } from './NoteLayout'
import { Badge, Button, Col, Row, Stack } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'

type NoteProps = {
  onDelete: (id: string) => void
}

export default function Note({ onDelete }: NoteProps): JSX.Element {
  const note = useNote()
  const navigate = useNavigate()

  function handleDelete(id: string) {
    onDelete(id)
    navigate('/')
  }

  return (
    <>
      <Row className='align-items-center mb-4'>
        <Col>
          <h1>{note.title}</h1>
          {note?.tags?.length > 0 && (
            <Stack gap={1} direction='horizontal' className='flex-wrap'>
              {note?.tags?.map((tag) => (
                <Badge key={tag.id} className='text-truncate'>
                  {tag.label}
                </Badge>
              ))}
            </Stack>
          )}
        </Col>
        <Col xs='auto'>
          <Stack gap={2} direction='horizontal'>
            <Link to={`/${note.id}/edit`}>
              <Button variant='primary'>Edit</Button>
            </Link>
            <Button onClick={() => handleDelete(note.id)} variant='outline-danger'>
              Delete
            </Button>
            <Link to={`/`}>
              <Button variant='outline-secondary'>Back</Button>
            </Link>
          </Stack>
        </Col>
      </Row>
      <ReactMarkdown>{note.markdown}</ReactMarkdown>
    </>
  )
}
