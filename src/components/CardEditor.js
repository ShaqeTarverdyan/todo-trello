import React, { useState, useEffect } from 'react';
import { DialogTitle, DialogContent, Icon, Card, Typography, Box, Input } from '@material-ui/core';
import { connect } from 'react-redux';
import { editCardTitle } from '../actions';
import AddComment from './AddComment';
import { styled } from '@material-ui/core/styles';


const CardEditor = ({card, setDialogOpened, editCardTitle, listID}) => {
	const {id, title} = card;
	const [cardTitle, setCardTitle] = useState(title);

	const handleChangeTitle = (title) => {
		setCardTitle(title);
	}

	useEffect(() => {
		editCardTitle(id, listID, cardTitle)
	}, [cardTitle, listID, id, editCardTitle])


	return (
		<DialogContainer>
			<DialogHeader>
				<DialogTitle>
					<CardTitle 
						value={cardTitle}
						type="text"
						onChange={(e) => handleChangeTitle(e.target.value)}
						disableUnderline={true} 
					/>
				</DialogTitle>
				<EditIcon onClick={() => setDialogOpened(false)}>close</EditIcon>
			</DialogHeader>
			<DialogContent>
				<AddComment cardId={id} listId={listID}/>
				{
					card.comments ?
						card.comments.map((comment, index) => 
							<CommentContent key={comment.id}>
								<Typography >{comment.text}</Typography>
							</CommentContent>
						)
					: ''
				}
			</DialogContent>
		</DialogContainer>
	);
}

const DialogContainer = styled(Box)({
	width: '600px',
	height: '500px',
	overflow: 'auto',
	backgroundColor: '#ebf2ed',
})

const DialogHeader = styled(Box)({
	display: 'flex',
  	justifyContent: 'space-between',
    padding: '8px',
    alignItems: 'center'
})

const EditIcon = styled(Icon)({
	cursor: 'pointer',
  	color: 'grey'
})

const CardTitle = styled(Input)({
	padding: '1rem',
    border: 'none',
    outline: 'none',
    fontSize: '18px',
    textTransform: 'capitalize',
    fontWeight: 'bold',
    width: '80%',
    backgroundColor: 'inherit',
})

const CommentContent = styled(Card)({
	padding: '1rem',
  	width: 'fit-content',
  	margin: 0,
    marginTop: '1rem',
})
const mapStateToProps = state => ({
	lists: state.lists
})

const mapDispatchToState = dispatch => ({
	editCardTitle: (id,listID, title) => dispatch(editCardTitle(id, listID, title))
})

export default connect(mapStateToProps, mapDispatchToState)(CardEditor);