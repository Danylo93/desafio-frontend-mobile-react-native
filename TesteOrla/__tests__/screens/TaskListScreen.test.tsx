import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import TaskListScreen from '../../src/screens/TaskListScreen';
import { deleteTask } from '../../src/redux/tasksSlice';

const mockStore = configureStore([]);

describe('TaskListScreen', () => {
  const initialState = {
    tasks: [
      { id: '1', title: 'Task 1', description: 'Description 1', completed: false },
      { id: '2', title: 'Task 2', description: 'Description 2', completed: false },
    ],
  };

  it('renders task list and handles search input', () => {
    const store = mockStore(initialState);
    const navigation = { navigate: jest.fn() };

    const { getByPlaceholderText, queryByText } = render(
      <Provider store={store}>
        <TaskListScreen navigation={navigation} />
      </Provider>
    );

    // Verifica se os itens da lista são renderizados corretamente
    expect(queryByText('Task 1')).toBeTruthy();
    expect(queryByText('Task 2')).toBeTruthy();

    // Simula a interação com a barra de pesquisa
    const searchInput = getByPlaceholderText('Search tasks');
    fireEvent.changeText(searchInput, 'Task 1'); // Filtra por "Task 1"

    // Verifica se apenas o item filtrado é visível
    expect(queryByText('Task 1')).toBeTruthy();
    expect(queryByText('Task 2')).toBeFalsy();
  });

  it('deletes a task when delete button is pressed', () => {
    const store = mockStore(initialState);
    store.dispatch = jest.fn();
    const navigation = { navigate: jest.fn() };

    const { getByText } = render(
      <Provider store={store}>
        <TaskListScreen navigation={navigation} />
      </Provider>
    );

    // Simula a exclusão de uma tarefa
    const deleteButton = getByText('Delete');
    fireEvent.press(deleteButton);

    // Verifica se a ação de deleteTask foi despachada com o ID correto
    expect(store.dispatch).toHaveBeenCalledWith(deleteTask('1'));
  });
});
