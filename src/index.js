// index.js
import React from "react";
import ReactDOM from "react-dom";

const messeges = [
  { name: "Федор", content: "Hello, World!" },
  { name: "World", content: "Hello, Федор! How are you?" },
  { name: "Федор", content: "Fine, thanks!" },
];

const Messege = ({ name, content }) => {
  return (
    <li>
      <strong>{name}: </strong>
      {content}
    </li>
  );
};

const MessegeList = ({ messeges }) => {
  function btnPush() {
    messeges.push({ name: "Кнопка", content: "Satisfaction!!!" });
    rend();
  }
  return (
    <div>
      <button onClick={btnPush}>Push me!!!</button>
      <ul>
        {messeges.map((item, index) => (
          <Messege {...item} key={index} />
        ))}
      </ul>
    </div>
  );
};

function rend() {
  ReactDOM.render(
    <MessegeList messeges={messeges} />,
    document.getElementById("root")
  );
}
rend();
