import React from "react";
import Card from "./Card";
import ActionButton from "./ActionButton";
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { Box } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';


const List = ({ title, cards, listID, index }) => {
  return (
    <Draggable draggableId={`list-${listID}`} index={index}>
      {
        provided => (
          <ListContainer
              {...provided.draggableProps}
              ref={provided.innerRef}
              {...provided.dragHandleProps}
          >
            <Droppable droppableId={String(listID)}>
              {provided => (
                <Box
                  {...provided.droppableProps} 
                  ref={provided.innerRef}
                >
                  <h3 style={{textAlign: 'center', letterSpacing: '3px', fontSize: 'x-large'}}>{title}</h3>
                  {cards.map((card, index) => (
                    <Card 
                      key={card.id} 
                      cardProps={card}
                      index={index}
                      listID={listID}
                    />
                  ))}
                  {provided.placeholder}
                  <ActionButton listID={listID} />
                </Box>
              )}
            </Droppable>
          </ListContainer>
          )
      }

    </Draggable>
  );
};

const ListContainer = styled(Box)({
  height: "100%",
  background: "#e8eaed",
  borderRadius: "4px",
  padding: 8,
  margin: 8,
})

export default List;
