import React, { useState } from "react";
import { Draggable } from 'react-beautiful-dnd';
import { 
    Icon, 
    Dialog, 
    Card, 
    Typography, 
    CardContent
}  from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import CardEditor from './CardEditor';

const CardComponent = ({ index, listID, cardProps }) => {
  const { title, id } = cardProps;

  const [hoverElement, setHoverElement] = useState(false);
  const [dialogOpened, setDialogOpened] = useState(false);

  return (
    <Draggable draggableId={String(id)} index={index}>
      {provided => (
        <div 
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <StyledCard  
            onMouseLeave={() => setHoverElement(false)} 
            onMouseEnter={() => setHoverElement(true)}
            onClick={() => setDialogOpened(true)} 
          >
            <CardContent>
              <Typography gutterBottom>{title}</Typography>
            </CardContent>
            <EditIcon style={{visibility: hoverElement ? 'visible' : 'hidden'
            }}>edit</EditIcon>
          </StyledCard>
          <Dialog open={dialogOpened} onClose={() => setDialogOpened(false)}>
              <CardEditor 
                card={cardProps} 
                listID={listID}
                setDialogOpened={setDialogOpened}
              />
          </Dialog>
        </div>
      )}
    </Draggable>
  );
};

const StyledCard = styled(Card)({
  marginBottom: 8,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between'
})

const EditIcon = styled(Icon)({
  paddingRight: '8px',
  color: 'grey',
  fontSize: '20px',
  cursor: 'pointer',
})


export default CardComponent;
