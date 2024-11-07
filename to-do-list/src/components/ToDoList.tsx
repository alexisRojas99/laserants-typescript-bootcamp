import { FC, useState } from "react";
import styles from "../scss/ToDoList.module.css";
import Modal from "react-modal";

type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

const ToDoList: FC = () => {
  const [todo, setTodo] = useState<Todo[]>([]);
  const [input, setInput] = useState<string>("");
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const addTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      const newTodo: Todo = {
        id: Date.now(),
        text: input,
        completed: false,
      };
      setTodo([...todo, newTodo]);
      setInput("");
      closeModal();
    }
  };

  const toggleComplete = (id: number) => {
    setTodo(
      todo.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodo(todo.filter((todo) => todo.id !== id));
  };

  return (
    <div className={styles.app}>
      <h1 className={styles.title}>TODO LIST</h1>
      <div className={styles.container}>
        <form onSubmit={addTodo} className={styles.form}>
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            contentLabel="Example Modal"
            className={styles.modal}
            overlayClassName={styles.overlay}
            ariaHideApp={false}
          >
            <div className={styles.modalContainer}>
              <span className={styles.titleTask}>Create new task</span>

              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Add a new task"
                required
              />
              <button type="button" onClick={addTodo}>
                Add task
              </button>
            </div>
          </Modal>

          <button type="button" onClick={openModal}>
            Add task
          </button>
        </form>
        <ul className={styles.todoList}>
          {todo.length > 0 ? (
            todo.map((todo) => (
              <li
                key={todo.id}
                className={`${styles.todoItem} ${
                  todo.completed ? styles.completed : ""
                }`}
              >
                <div className={styles.taskDesc}>
                  <input
                    type="checkbox"
                    className={styles.completed}
                    checked={todo.completed}
                    onChange={() => toggleComplete(todo.id)}
                  />
                  <span>{todo.text}</span>
                </div>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className={styles.deleteButton}
                  disabled={todo.completed}
                >
                  Delete
                </button>
              </li>
            ))
          ) : (
            <div className={styles.noTasks}>
              <span>No tasks for today...</span>
            </div>
          )}
        </ul>
      </div>
    </div>
  );
};

export default ToDoList;
