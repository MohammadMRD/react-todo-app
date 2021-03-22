const e = React.createElement;

function Header() {
  return e("header", { className: "header" }, [
    e("h1", null, "TODO"),
    e("span", null, "✔"),
  ]);
}

function AddInput({ addItem }) {
  const [text, updateText] = React.useState("");

  const input = e("input", {
    type: "text",
    className: "add-input",
    placeholder: "Create a new todo...",
    value: text,
    onChange(e) {
      updateText(e.target.value);
    },
    onKeyUp(e) {
      if (e.code !== "Enter" && e.code !== "NumpadEnter") return;

      const value = e.target.value.trim();
      if (value) {
        addItem(value);
        updateText("");
      }
    },
  });

  return e("div", { className: "input-container" }, input);
}

function TodoList({ todoList, doneItem }) {
  const list = todoList.map((item, index) =>
    e(
      "div",
      {
        className: item.done ? 'done' : '',
        onClick() {
          doneItem(index);
        },
      },
      e("span", null, item.text)
    )
  );

  return e("section", { className: "todo-list" }, list);
}

function useList() {
  const [todoList, updateTodoList] = React.useState([]);

  function addItem(text) {
    updateTodoList((prevTodoList) => [{ text, done: false }, ...prevTodoList]);
  }

  function doneItem(index) {
    updateTodoList((prevTodoList) => {
      prevTodoList[index].done = !prevTodoList[index].done;

      return [...prevTodoList];
    });
  }

  return [todoList, addItem, doneItem];
}

function App() {
  const [todoList, addItem, doneItem] = useList();

  return e("div", { className: "todo-app" }, [
    e(Header),
    e(AddInput, { addItem }),
    e(TodoList, { todoList, doneItem }),
  ]);
}

ReactDOM.render(e(App), document.getElementById("app"));
