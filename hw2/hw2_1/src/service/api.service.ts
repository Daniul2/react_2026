import type {TodoModel} from '../models/TodoModel.ts';

const endpointTodos = import.meta.env.VITE_API_BASE_URL + '/todos';

const loadTodos = async (): Promise<TodoModel[]> => {
    return await fetch(endpointTodos)
        .then(value => value.json());
};

export {loadTodos};
