import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { addTask } from '../../src/redux/tasksSlice';
import TaskCreateScreen from '../../src/screens/TaskCreateScreen';

const mockStore = configureStore([]);

describe('TaskCreateScreen', () => {
  it('renders task create form and adds new task', () => {
    const store = mockStore({});
    store.dispatch = jest.fn();
    const navigation = { goBack: jest.fn() };

    const { getByPlaceholderText, getByText } = render(
      <Provider store={store}>
        <TaskCreateScreen navigation={navigation} />
      </Provider>
    );

    const titleInput = getByPlaceholderText('Title');
    fireEvent.changeText(titleInput, 'New Task');
    const descriptionInput = getByPlaceholderText('Description');
    fireEvent.changeText(descriptionInput, 'New Description');

    const addButton = getByText('Add Task');
    fireEvent.press(addButton);

    expect(store.dispatch).toHaveBeenCalledWith(
      addTask({
        title: 'New Task',
        description: 'New Description',
        completed: false,
        createdAt: expect.any(String), 
        updatedAt: expect.any(String),
        id: expect.any(String),
      })
    );
    expect(navigation.goBack).toHaveBeenCalled();
  });
});
