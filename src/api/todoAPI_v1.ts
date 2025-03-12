import type { ITodoInfo, ITodoItem, MetaResponse } from '@/types/todo.interface';

const BASE_URL = 'https://easydev.club/api/v1/todos';

export async function getTodos(filter: string): Promise<MetaResponse<ITodoItem, ITodoInfo>> {
  try {
    const response = await fetch(`${BASE_URL}?filter=${filter}`);
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function deleteTodo(id: number) {
  try {
    await fetch(`${BASE_URL}/${id}`, {
      method: 'DELETE',
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function updateTodo(updatedTask: Partial<ITodoItem>, taskItemId: number) {
  try {
    await fetch(`${BASE_URL}/${taskItemId}`, {
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
    await fetch(BASE_URL, {
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
