import React from 'react';
import { Button, Col, Form, Row, Stack } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import CreatableReactSelect from 'react-select/creatable';
import { NoteData, Tag } from './App';

type NoteFormProps = {
  onSubmit: (data: NoteData) => void;
};

export default function NoteForm({ onSubmit }: NoteFormProps) {
  const titleRef = React.useRef<HTMLInputElement>(null);
  const markdownRef = React.useRef<HTMLTextAreaElement>(null);
  const [selectedTags, setSelectedTags] = React.useState<Tag[]>([]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    onSubmit({
      title: titleRef.current!.value,
      markdown: markdownRef.current!.value,
      tags: [],
    });
  }

  return (
    <Form>
      <Stack gap={4} onSubmit={handleSubmit}>
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
                value={selectedTags.map((tag) => {
                  return { value: tag.id, label: tag.label };
                })}
                onChange={(tags) => {
                  setSelectedTags(
                    tags.map((tag) => {
                      return { id: tag.value, label: tag.label };
                    })
                  );
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
  );
}
