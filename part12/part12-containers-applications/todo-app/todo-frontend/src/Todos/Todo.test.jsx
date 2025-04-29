import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Todo from './Todo';

test('renders Todo component correctly and handles interactions', async () => {
  const mockClickComplete = vi.fn();
  const mockClickDelete = vi.fn();

  const testTodo = {
    text: 'Todo component test',
  };

  render(
    <Todo
      todo={testTodo}
      onClickComplete={mockClickComplete}
      onClickDelete={mockClickDelete}
    />
  );

  const todoElement = screen.getByText('Todo component test');
  expect(todoElement).toBeInTheDocument();

  const user = userEvent.setup();

  const doneButton = screen.getByRole('button', {
    name: /set as done/i,
  });
  await user.click(doneButton);
  expect(mockClickComplete).toHaveBeenCalledTimes(1);

  const deleteButton = screen.getByRole('button', {
    name: /delete/i,
  });
  await user.click(deleteButton);
  expect(mockClickDelete).toHaveBeenCalledTimes(1);
});
