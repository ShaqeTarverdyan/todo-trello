import React, { useState } from 'react';
import Textarea from "react-textarea-autosize";
import { Icon, Card, Button, Box } from "@material-ui/core";
import { connect } from 'react-redux';
import { addComment } from '../actions';
import { styled } from '@material-ui/core/styles';


const AddComment = ({ cardId, listId, addComment }) => {

	const [openActions, setOpenActions] = useState(false);
	const [comment, setComment] = useState('')

	const handleTextArea = (e) => {
    	setComment(e.target.value);
  	};

  	const handleClick = () => {
		setOpenActions(false);
		if(comment != '') {
			addComment(cardId,listId, comment);
			setComment('')
		}
	}

	return (
		<div>
			<Header>
				<Icon style={{paddingRight: '8px'}}>list</Icon>
				<p>Activity</p>
			</Header>
			<Card style={{padding: "6px 8px 12px"}}>
	          <Textarea
	            placeholder='What you think? '
	            onMouseUp={() => setOpenActions(true)}
	            onChange={handleTextArea}
	            value={comment}
	            style={{
	              resize: "none",
	              outline: "none",
	              border: "none",
	              width: "100%",
	              overflow: "hidden",
	              padding: '8px',
	              lineHeight: '20px'
	            }}
	          />
	          <div>
	          	{
	          		openActions && 
	          		<SaveButton  onMouseDown={handleClick}>Save</SaveButton>
	          	}
	          </div>
	        </Card>
		</div>
	)
}

const Header = styled(Box)({
	fontWeight: 'bold',
	display: 'flex',
	alignItems: 'center',
})

const SaveButton = styled(Button)({
	fontSize: '12px',
	backgroundColor: 'green'
})

const mapDispatchToState = dispatch => ({
	addComment: (cardId, listId, text) => dispatch(addComment(cardId, listId, text))
})

export default connect(null, mapDispatchToState)(AddComment);