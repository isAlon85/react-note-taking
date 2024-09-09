import React from 'react'
import { Button, Col, Form, Row, Stack } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import CreatableReactSelect from 'react-select/creatable'
import { NoteData, Tag } from './App'
import { v4 as uuidV4 } from 'uuid'

type NoteFormProps = {
  onSubmit: (data: NoteData) => void
  onAddTag: (tag: Tag) => void
  availableTags: Tag[]
}

export default function NoteForm({
  onSubmit,
  onAddTag,
  availableTags,
}: NoteFormProps): JSX.Element {
  const titleRef = React.useRef<HTMLInputElement>(null)
  const markdownRef = React.useRef<HTMLTextAreaElement>(null)
  const [selectedTags, setSelectedTags] = React.useState<Tag[]>([])
  const navigate = useNavigate()

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    onSubmit({
      title: titleRef.current!.value,
      markdown: markdownRef.current!.value,
      tags: selectedTags,
    })

    navigate('..')
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Stack gap={4}>
        <Row>
          <Col>
            <Form.Group className='mb-3' controlId='title'>
              <Form.Label>Title</Form.Label>
              <Form.Control ref={titleRef} required type='text' placeholder='Enter title' />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className='mb-3' controlId='title'>
              <Form.Label>Tags</Form.Label>
              <CreatableReactSelect
                onCreateOption={(label) => {
                  const newTag = { id: uuidV4(), label: label }
                  onAddTag(newTag)
                  setSelectedTags((prev) => [...prev, newTag])
                }}
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
        <Form.Group className='mb-3' controlId='markdown'>
          <Form.Label>Body</Form.Label>
          <Form.Control ref={markdownRef} required as='textarea' />
        </Form.Group>
        <Stack direction='horizontal' gap={2} className='justify-content-end'>
          <Button variant='primary' type='submit'>
            {' '}
            Save{' '}
          </Button>
          <Link to='/notes'>
            <Button variant='outline-secondary' type='button'>
              Cancel
            </Button>
          </Link>
        </Stack>
      </Stack>
    </Form>
  )
}
