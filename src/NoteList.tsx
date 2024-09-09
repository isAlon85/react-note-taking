import React, { useMemo } from 'react'
import { Row, Col, Stack, Button, Form, Card, Badge } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import CreatableReactSelect from 'react-select/creatable'
import { Tag } from './App'
import styles from './NoteList.module.css'

type NoteListProps = {
  availableTags: Tag[]
  notes: SimplifiedNote[]
}

type SimplifiedNote = {
  tags: Tag[]
  title: string
  id: string
}

export default function NoteList({ availableTags, notes }: NoteListProps): JSX.Element {
  const [selectedTags, setSelectedTags] = React.useState<Tag[]>([])
  const [title, setTitle] = React.useState('')

  const filteredNotes = useMemo(() => {
    return notes?.filter((note) => {
      return (
        (title === '' || note.title.toLowerCase().includes(title.toLowerCase())) &&
        (selectedTags.length === 0 || selectedTags.every((tag) => note.tags.includes(tag)))
      )
    })
  }, [notes, title, selectedTags])

  return (
    <>
      <Row className='align-items-center mb-4'>
        <Col>
          <h1>Notes</h1>
        </Col>
        <Col xs='auto'>
          <Stack gap={2} direction='horizontal'>
            <Link to={'/new'}>
              <Button variant='primary'>Create</Button>
            </Link>
            <Button variant='outline-secondary'>Edit Tags</Button>
          </Stack>
        </Col>
      </Row>
      <Form>
        <Row className='mb-4'>
          <Col>
            <Form.Group controlId='title'>
              <Form.Label>Title</Form.Label>
              <Form.Control
                type='text'
                value={title}
                onChange={(event) => setTitle(event.target.value)}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className='mb-3' controlId='title'>
              <Form.Label>Tags</Form.Label>
              <CreatableReactSelect
                value={selectedTags.map((tag) => {
                  return { value: tag.id, label: tag.label }
                })}
                options={availableTags.map((tag) => {
                  return { value: tag.id, label: tag.label }
                })} // Add this line to map tags to value and label
                onChange={(tags) => {
                  setSelectedTags(
                    tags.map((tag) => {
                      return { id: tag.value, label: tag.label }
                    })
                  )
                }}
                isMulti
              />
            </Form.Group>
          </Col>
        </Row>
      </Form>
      <Row xs={1} sm={2} lg={3} xl={4} className='g-3'>
        {filteredNotes?.map((note) => {
          return (
            <Col key={note.id}>
              <NoteCard id={note.id} title={note.title} tags={note.tags} />
            </Col>
          )
        })}
      </Row>
    </>
  )
}

function NoteCard({ id, title, tags }: SimplifiedNote): JSX.Element {
  return (
    <Card
      as={Link}
      to={`/$${id}`}
      className={`h-100 text-reset text-decoration-none ${styles.card}`}
    >
      <Card.Body>
        <Stack gap={2} className='h-100 align-items-center justify-content-center'>
          <span className='fs-5'>{title}</span>
          {tags?.length > 0 && (
            <Stack gap={1} direction='horizontal' className='justify-content-center flex-wrap'>
              {tags?.map((tag) => (
                <Badge key={tag.id} className='text-truncate'>
                  {tag.label}
                </Badge>
              ))}
            </Stack>
          )}
        </Stack>
      </Card.Body>
    </Card>
  )
}
