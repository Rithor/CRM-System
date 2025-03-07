export function validateTaskTitle(title: string) {
  if (!title) {
    return 'название задачи обязательно для заполнения';
  }
  if (title.length < 2 || title.length > 64) {
    return 'допускается ввод от 2 до 64 знаков';
  }
  return null;
}
