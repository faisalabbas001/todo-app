import React, { useState } from 'react'; // Corrected import for React and useState
import { useTodos } from '../store/todos'; // Corrected import for useTodos

const AddTodo = () => {
    const [todo, setTodo] = useState("");
    const { handleAddTodo } = useTodos();

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        handleAddTodo(todo);
        setTodo("");
    }

    return (
        <form onSubmit={handleFormSubmit}>
            <input type="text" value={todo} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTodo(e.target.value)} />
            <button type="submit">Add</button>
        </form>
    )
}

export default AddTodo;
