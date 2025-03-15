import type { TodoInfo, Todo, MetaResponse, TodoFilter, TodoRequest } from '@/types/todos';

const BASE_URL = 'https://easydev.club/api/v1';

export async function getTodos(filter: TodoFilter): Promise<MetaResponse<Todo, TodoInfo>> {
  try {
    const response = await fetch(`${BASE_URL}/todos?filter=${filter}`);
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function deleteTodo(id: number) {
  try {
    await fetch(`${BASE_URL}/todos/${id}`, {
      method: 'DELETE',
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function updateTodo(taskItemId: number, updatedTask: TodoRequest) {
  try {
    await fetch(`${BASE_URL}/todos/${taskItemId}`, {
      method: 'PUT',
      body: JSON.stringify(updatedTask),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function createTodo(todoTitle: string) {
  try {
    const newTask = {
      title: todoTitle,
      isDone: false,
    };
    await fetch(`${BASE_URL}/todos`, {
      method: 'POST',
      body: JSON.stringify(newTask),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
}
