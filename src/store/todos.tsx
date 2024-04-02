
import React, { ReactNode, createContext, useContext, useState, useEffect } from "react";

// create context  
export const TodosContext = createContext<TodosContextType | null>(null);

// Provider 
export type TodoProviderProps = {
    children: ReactNode
}

export type Todo = {
    id: string;
    task: string;
    completed: boolean;
    createdAt: Date;
}

export type TodosContextType = {
    todos: Todo[];
    handleAddTodo: (task: string) => void;
    toggleTodoAsCompleted: (id: string) => void;
    handleDeleteTodo: (id: string) => void;
}

export const TodosProvider = ({ children }: TodoProviderProps) => {
    const [todos, setTodos] = useState<Todo[]>(() => {
        try {
            const storedTodos = localStorage.getItem("todos") || "[]"; // Corrected key from "todo" to "todos"
            return JSON.parse(storedTodos) as Todo[];
        } catch (error) {
            console.error("Error retrieving todos from localStorage:", error);
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos]);

    const handleAddTodo = (task: string) => {
        const newTodo: Todo = {
            id: Math.random().toString(),
            task: task,
            completed: false,
            createdAt: new Date()
        };
        setTodos((prev) => [newTodo, ...prev]);
    }

    const toggleTodoAsCompleted = (id: string) => {
        setTodos((prev) => {
            const newTodos = prev.map((todo) => {
                if (todo.id === id) {
                    return { ...todo, completed: !todo.completed };
                }
                return todo;
            });
            return newTodos;
        });
    }

    const handleDeleteTodo = (id: string) => {
        setTodos((prev) => prev.filter((todo) => todo.id !== id));
    }

    return (
        <TodosContext.Provider value={{ todos, handleAddTodo, toggleTodoAsCompleted, handleDeleteTodo }}>
            {children}
        </TodosContext.Provider>
    );
}

// Consumer 
export const useTodos = () => {
    const todoConsumer = useContext(TodosContext);
    if (!todoConsumer) {
        throw new Error("useTodos must be used within a TodosProvider");
    }
    return todoConsumer;
}
