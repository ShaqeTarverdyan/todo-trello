import React, { useState } from "react";
import { Icon, Card, Button, Box } from "@material-ui/core";
import Textarea from "react-textarea-autosize";

import { connect } from 'react-redux';
import { addList, addCard } from '../actions'

import { styled } from '@material-ui/core/styles';

const ActionButton = ({ list, addList, addCard, listID }) => {
  const [openForm, setOpenForm] = useState(false);
  const [formText, setFormText] = useState("");

  const handleTextArea = (e) => {
    setFormText(e.target.value);
  };

  const handleAddList = () => {
    if(formText) {
      addList(formText);
      setFormText('');
    }
  }

  const handleAddCard = () => {
    if(formText) {
      addCard(listID, formText)
       setFormText('');
    }

  }

  const renderButton = () => {
    const buttonText = list ? "Add N0ew List" : "Add New Card";
    const buttonTextColor = list ? "white" : "inherit";
    const buttonBackgroundColor = list ? "rgba(0,0,0, 0.15)" : "none";
    const buttonOpacity = list ? "1" : "0.5";
    return (
      <ButtonWrapper
        style={{
          color: buttonTextColor,
          backgroundColor: buttonBackgroundColor,
          opacity: buttonOpacity,
        }}
        onClick={() => setOpenForm(true)}
      >
        <Icon>add</Icon>
        <p>{buttonText}</p>
      </ButtonWrapper>
    );
  };


  const renderForm = () => {
    const placeholder = list ? "Add List title" : "Add Card title";
    const buttonText = list ? "Add List" : "Add Card";
    return (
      <div style={{ margin: 8, backgroundColor: '#e8eaed', height: 'fit-content' }}>
        <Card
          style={{
            padding: "6px 8px 12px",
            minHeight: 50,
            minWidth: 272,
          }}
        >
          <Textarea
            placeholder={placeholder}
            autoFocus
            onBlur={() => setOpenForm(false)}
            value={formText}
            onChange={handleTextArea}
            style={{
              resize: "none",
              outline: "none",
              border: "none",
              width: "100%",
              overflow: "hidden",
            }}
          />
        </Card>
        <FormButtonGroup>
          <Button 
              onMouseDown = {list ? handleAddList : handleAddCard}
              style={{ color: "white", backgroundColor: "green" }}>
            {buttonText}
          </Button>
          <CloseIcon onClick={() => setOpenForm(false)}>close</CloseIcon>
        </FormButtonGroup>
      </div>
    );
  };
  return openForm ? renderForm() : renderButton();
};

const ButtonWrapper = styled(Button)({
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    margin: 8,
    padding: "0px 8px",
    width: "300px",
    height: '100%',
    backgroundColor: '#e8eaed',
    maxHeight: '120px',
    justifyContent: 'end'
})

const FormButtonGroup = styled(Box)({
  display: "flex",
  alignItems: "center",
  margin: 8,
})

const CloseIcon = styled(Icon)({
  cursor: 'pointer',
  marginLeft: '10px'
})

const mapDispatchToState = dispatch => ({
    addList: (e) => dispatch(addList(e)),
    addCard: (listId, text) => dispatch(addCard(listId, text))
})

export default connect(null, mapDispatchToState)(ActionButton);
