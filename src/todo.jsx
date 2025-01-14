import { useState } from "react"
import { v4 as uuidv4 } from 'uuid';
import { useSelector, useDispatch } from "react-redux";
import { login, logout } from "./store/authSlice";
import '@fortawesome/fontawesome-free/css/all.min.css';

export default function TodoList() {
    // Redux state and actions
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const dispatch = useDispatch();

    let [todos, setTodos] = useState([{ task: "sample Task", id: uuidv4(), isDone: false }]);
    let [newTodo, setNewTodo] = useState("");
    let [priority, setPriority] = useState("Medium");

    let addNewTask = () => {
        setTodos((prevTodos) => {
            return [...prevTodos, {
                task: newTodo, id: uuidv4(), isDone: false, priority: priority
            }];
        });
        setNewTodo("");
        setPriority("Medium");
    }

    // Sort tasks by priority (High -> Medium -> Low)
    const sortTasksByPriority = () => {
        setTodos((prevTodos) => {
            const priorityOrder = { High: 1, Medium: 2, Low: 3 };
            return [...prevTodos].sort(
                (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]
            );
        });
    };

    let updatePriority = (event) => {
        setPriority(event.target.value);
    };

    let updateTodoValue = (event) => {
        //console.log(event.target.value);
        setNewTodo(event.target.value);
    }
    let deleteTodo = (id) => {
        //console.log(id);
        setTodos((prevTodos) => todos.filter((prevTodos) => prevTodos.id != id));
    }

    let isDone = (id) => {
        setTodos((prevTodos) =>
            prevTodos.map((prevTodo) => {
                if (prevTodo.id === id) {
                    return {
                        ...prevTodo,
                        isDone: true
                    }
                } else {
                    return prevTodo;
                }
            }))
    }

    let markAsAllDone = () => {
        setTodos((prevTodos) =>
            prevTodos.map((prevTodo) => {
                return {
                    ...prevTodo,
                    isDone: true
                }
            }))
    }

    return (
        <>
            {!isAuthenticated ? (
                <div className="home">
                    <h2>Please Login to Access Your To-Do List</h2>
                    <button style={{ alignContent: "center" }} onClick={() => dispatch(login())}>Login</button>
                </div>
            ) : (
                <>
                    <div class="main">
                        <div class="sidebar">
                            <div className="user-profile">
                                <img
                                    src="../userlogo.jpg"
                                    alt="User"
                                    className="user-avatar"
                                />
                                <h3>Hey!</h3>
                            </div>
                            <div class="nav">
                                <div class="nav-option">
                                    <i class="fa fa-list-ul" aria-hidden="true"></i>
                                    <a href="#" onClick={(e) => { e.preventDefault(); markAsAllDone(); }}>Mark All As Done</a>
                                </div>
                                <div class="nav-option">
                                    <i class="fa-solid fa-magnifying-glass"></i>
                                    <a href="#" onClick={(e) => { e.preventDefault(); sortTasksByPriority(); }}>Sort Task By Priority</a>
                                </div>
                                <button onClick={() => dispatch(logout())}>Logout</button>
                            </div>
                        </div>

                        <div class="main_content">
                            <div className="sticky-nav">
                                <input
                                    type="text"
                                    placeholder="Add a Task"
                                    value={newTodo}
                                    onChange={updateTodoValue}
                                />
                                <div className="addbtnbox">
                                    <div className="icons">
                                        <i class="fa fa-bell" aria-hidden="true"></i>
                                        <i class="fa fa-refresh" aria-hidden="true"></i>
                                    </div>
                                    <div className="addbtn">
                                        <select value={priority} onChange={updatePriority}>
                                            <option value="High">High</option>
                                            <option value="Medium">Medium</option>
                                            <option value="Low">Low</option>
                                        </select>
                                        <button onClick={addNewTask}>Add</button>
                                    </div>
                                </div>
                            </div>
                            <div className="TodoList">
                                <ul>
                                    {todos.map((todo) => (
                                        <li key={todo.id}>
                                            <span
                                                style={{ textDecoration: todo.isDone ? "line-through" : "none" }}
                                            >
                                                {todo.task} - <strong>{todo.priority}</strong>
                                            </span>
                                            &nbsp;
                                            <button className="Delete" onClick={() => deleteTodo(todo.id)}>Delete</button>

                                            <button className="Done" onClick={() => isDone(todo.id)}>Done</button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                    </div>
                </>
            )
            }
        </>
    )
}




