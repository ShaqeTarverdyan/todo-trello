import { CONSTANTS } from "../actions";

export const addCard = (listID, title) => {
  return {
    type: CONSTANTS.ADD_CARD,
    payload: {listID, title},
  };
};


export const editCardTitle = (id ,listID, title) => {
	return {
		type: CONSTANTS.EDIT_CARD_TITLE,
		payload: {id, listID,title},
	}
}


export const addComment = (cardId, listId, text) => {
	return {
		type: CONSTANTS.ADD_COMMENT,
		payload: {cardId, listId, text}
	}
}