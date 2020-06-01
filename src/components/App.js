import React from "react";
import List from "./List";
import ActionButton from "./ActionButton";
import { connect } from "react-redux";
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { sort } from '../actions';


const App = ({ lists, sort }) => {

  const onDragEnd = (result) => {
    const { destination, source, draggableId, type } = result;
    if (!destination) return;

    sort(
      source.droppableId,
      destination.droppableId,
      source.index,
      destination.index,
      draggableId,
      type
    )

  }
  return (
    <div style={{backgroundColor: '#3177d4', height: 'calc(100vh - 10px'}}>
    <DragDropContext onDragEnd ={onDragEnd}>
      <Droppable droppableId="all-list" type="list" direction="horizontal">
        {provided => (
          <div 
            style={styles.listContainer} 
            {...provided.droppableProps} 
            ref={provided.innerRef}
          >
            {lists.map((list, index) => (
              <List 
                key={list.id} 
                title={list.title} 
                cards={list.cards} 
                listID={list.id}
                index={index}
              />
            ))}
            {provided.placeholder}
            <ActionButton list />
          </div>
          )}
      </Droppable>
    </DragDropContext>
    </div>
  );
};

const styles = {
  listContainer: {
    display: "flex",
    padding: '1rem'
  },
};

const mapStateToProps = (state) => ({
  lists: state.lists,
});

const mapDispatchToState = dispatch => ({
  sort: (...args) => dispatch(sort(...args)),
})
export default connect(mapStateToProps, mapDispatchToState)(App);
