import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import TaskEditScreen from '../../src/screens/TaskEditScreen';
import { updateTask } from '../../src/redux/tasksSlice';

const mockStore = configureStore([]);
const initialState = {
  tasks: [
    { id: '1', title: 'Task 1', description: 'Description 1', completed: false },
  ],
};

describe('TaskEditScreen', () => {
  it('renders task edit form and updates task', () => {
    const store = mockStore(initialState);
    store.dispatch = jest.fn();
    const navigation = { goBack: jest.fn() };
    const route = { params: { taskId: '1' } };

    const { getByPlaceholderText, getByText } = render(
      <Provider store={store}>
        <TaskEditScreen navigation={navigation} route={route} />
      </Provider>
    );

    // Busca pelo campo de título usando o placeholder
    const titleInput = getByPlaceholderText('Title');
    fireEvent.changeText(titleInput, 'Updated Task 1');

    // Busca pelo campo de descrição usando o placeholder
    const descriptionInput = getByPlaceholderText('Description');
    fireEvent.changeText(descriptionInput, 'Updated Description 1');

    const saveButton = getByText('Save');
    fireEvent.press(saveButton);

    expect(store.dispatch).toHaveBeenCalledWith(
      updateTask({
        id: '1',
        data: {
          title: 'Updated Task 1',
          description: 'Updated Description 1',
          // Aqui removi "completed" porque não está sendo atualizado explicitamente no teste
        }
      })
    );
    expect(navigation.goBack).toHaveBeenCalled();
  });
});
