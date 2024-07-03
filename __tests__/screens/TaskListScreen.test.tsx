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

    expect(queryByText('Task 1')).toBeTruthy();
    expect(queryByText('Task 2')).toBeTruthy();

   
    const searchInput = getByPlaceholderText('Search tasks');
    fireEvent.changeText(searchInput, 'Task 1');

  
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

   
    const deleteButton = getByText('Delete');
    fireEvent.press(deleteButton);

    
    expect(store.dispatch).toHaveBeenCalledWith(deleteTask('1'));
  });
});
