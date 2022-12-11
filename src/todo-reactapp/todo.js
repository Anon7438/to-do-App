import React, { useState, useEffect } from "react";
import "./style.css";

// get the localStorage data back
const getLocalData = () => {
  const lists = localStorage.getItem("mytodolist");
  if (lists) {
    return JSON.parse(lists);
  } else {
    return [];
  }
};

//useStates

const Todo = () => {
  const [inputValue, setinputValue] = useState("");
  const [items, setItems] = useState(getLocalData());
  const [isEditItem, setIsEditItem] = useState("");
  const [toggleButton, setToggleButton] = useState(false);

  //Add Items

  const addItems = () => {
    if (!inputValue) {
      alert("Input Can't be Empty ");
    } else if (inputValue && toggleButton) {
      setItems(
        items.map((curElem) => {
          if (curElem.id === isEditItem) {
            return { ...curElem, name: inputValue };
          }
          return curElem;
        })
      );

      setinputValue("");
      setIsEditItem(null);
      setToggleButton(false);
    } else {
      const mynewData = {
        id: new Date().getTime().toString(),
        name: inputValue,
      };
      setItems([...items, mynewData]);
      setinputValue("");
    }
  };

  //edit the items
  const editItem = (index) => {
    const item_todo_edited = items.find((curElem) => {
      return curElem.id === index;
    });
    setinputValue(item_todo_edited.name);
    setIsEditItem(index);
    setToggleButton(true);
  };

  //delete items section
  const deleteItem = (index) => {
    const updatedItem = items.filter((curElement) => {
      return curElement.id !== index;
    });
    setItems(updatedItem);
  };

  // remove all the elements
  const removeAll = () => {
    setItems([]);
  };

  // adding localStorage
  useEffect(() => {
    localStorage.setItem("mytodolist", JSON.stringify(items));
  }, [items]);

  return (
    <>
      <div className="main-div">
        <div className="child-div">
          {/* <LOGO> */}
          <figure>
            <img src="./images/todo.jpg" alt="logo" />
            <figcaption>📜 Add Your List Here ✌✔</figcaption>
          </figure>

          {/* Add Items Button */}
          <div className="addItems">
            <input
              type="text"
              placeholder="✍ Add Item Here....."
              className="form-control"
              value={inputValue}
              onChange={(event) => setinputValue(event.target.value)}
            />

            {toggleButton ? (
              <i className="far fa-edit add-btn" onClick={addItems}></i>
            ) : (
              <i className="fa fa-plus add-btn" onClick={addItems}></i>
            )}
          </div>

          {/* Show items  */}
          <div className="showItems">
            {items.map((curElement) => {
              return (
                <div className="eachItem" key={curElement.id}>
                  <h3>{curElement.name}</h3>

                  {/* Edit Delete button                 */}
                  <div className="todo-btn">
                    <i
                      className="far fa-edit add-btn"
                      onClick={() => editItem(curElement.id)}
                    ></i>
                    <i
                      className="far fa-trash-alt add-btn"
                      onClick={() => deleteItem(curElement.id)}
                    ></i>
                  </div>
                </div>
              );
            })}
          </div>
          {/* rmeove all button  */}
          <div className="showItems">
            <button
              className="btn effect04"
              data-sm-link-text="Remove All"
              onClick={removeAll}
            >
              <span>CHECK LIST</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Todo;
