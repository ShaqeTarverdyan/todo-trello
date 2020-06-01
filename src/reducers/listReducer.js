import { CONSTANTS } from "../actions";

const initialState = [];


let listID = 1;
let cardID = 1;
let commentID = 1;


const listReucer = (state = initialState, { type, payload }) => {
  const newState = JSON.parse(JSON.stringify(state));

  switch (type) {
    case CONSTANTS.ADD_LIST: {
      const newList = {
        title: payload,
        cards: [],
        id: listID,
      };
      listID += 1;
      newState.push(newList);
      return newState;
    }
     

    case CONSTANTS.ADD_CARD: {
      const newCard = {
        title: payload.title,
        id: cardID
      }

      cardID += 1;

      const currentList = newState.find(
        list => list.id === payload.listID
      );
      currentList.cards.push(newCard);
      return newState;
    }

    case CONSTANTS.DRAG_HAPPEND: {
      const {
        droppableIdStart,
        droppableIdEnd,
        droppableIndexStart,
        droppableIndexEnd,
        type
      } = payload;

      if (type === 'list') {
        const [currentList] = newState.splice(droppableIndexStart, 1);
        newState.splice(droppableIndexEnd, 0, currentList);
      } else {
        if(droppableIdStart === droppableIdEnd) {

        const currentList = newState.find(
          list => list.id === Number(droppableIdStart)
        );

        const [currentCard] = currentList.cards.splice(droppableIndexStart, 1)
        currentList.cards.splice(droppableIndexEnd, 0, currentCard);
        } else {
          const startList = newState.find(
            list => list.id === Number(droppableIdStart)
          )
          const [currentCard] = startList.cards.splice(droppableIndexStart, 1);

          const endList = newState.find(
            list => list.id === Number(droppableIdEnd)
          )
          endList.cards.splice(droppableIndexEnd, 0, currentCard)
        }
      }
      return newState;
    }

    case CONSTANTS.EDIT_CARD_TITLE : {

      newState.map(list => 
        {
          if(list.id === payload.listID) {
            list.cards.map(card => {
              if(card.id === payload.id) {
                return card.text = payload.title
              }
              return card
            })
            return list
          }
        }
      )
      return newState;
    }

    case CONSTANTS.ADD_COMMENT : {

      const newComment= {
        text: payload.text,
        id: commentID
      }
      commentID += 1;

      const currentList = newState.find(
        list => list.id === payload.listId
      );

      const currentCard = currentList.cards.find(
        card => card.id === payload.cardId
      );

      if(currentCard.comments) {
        currentCard.comments.push(newComment);
      }
      else {
        currentCard.comments = [{...newComment}]
      }
      return newState;
    }
    default:
      return newState;
  }
};

export default listReucer;
