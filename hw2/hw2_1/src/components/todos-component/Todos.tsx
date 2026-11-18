import './Todos.css';
import {useEffect, useState} from 'react';
import {loadTodos} from '../../service/api.service.ts';
import type {TodoModel} from '../../models/TodoModel.ts';
import {Todo} from '../todo-component/Todo.tsx';

export const Todos = () => {
    const [todos, setTodos] = useState<TodoModel[]>([]);

    useEffect(() => {
        loadTodos().then(value => setTodos(value));
    }, []);

    return (
        <div>
            {
                todos.map(todo => <Todo todo={todo} key={todo.id}/>)
            }
        </div>
    );
};
