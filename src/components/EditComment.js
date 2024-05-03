import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { editCommentThunk, getCommentById } from '../feature/followingPost/followingPostSlice';

function EditComment() {
  const { postId, commentId } = useParams();
  const [commentContent, setCommentContent] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    // Fetch the existing comment content
    dispatch(getCommentById(commentId))
      .then((response) => {
        if (response.meta.requestStatus === 'fulfilled') {
          setCommentContent(response.payload.content); // Set the current comment content
        } else {
          toast.error('Error loading comment.');
          navigate(-1); // Go back if the comment doesn't exist
        }
      });
  }, [commentId, dispatch, navigate]);

  const handleContentChange = (e) => {
    setCommentContent(e.target.value);
  };

  const handleSubmit = () => {
    dispatch(editCommentThunk({ postId, commentId, newContent: commentContent }))
      .then((result) => {
        if (result.meta.requestStatus === 'fulfilled') {
          toast.success('Comment updated successfully!');
          navigate(`/post/${postId}`); // Redirect to the post page or desired location
        } else {
          toast.error('Failed to update comment.');
        }
      });
  };

  return (
    <div>
      <h2>Edit Comment</h2>
      <Form>
        <Form.Group>
          <Form.Label>Comment Content</Form.Label>
          <Form.Control
            type="text"
            value={commentContent}
            onChange={handleContentChange}
          />
        </Form.Group>
        <Button variant="primary" onClick={handleSubmit}>
          Update Comment
        </Button>
      </Form>
    </div>
  );
}

export default EditComment;
