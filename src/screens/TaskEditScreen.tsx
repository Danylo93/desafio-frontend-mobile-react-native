// src/screens/TaskEditScreen.tsx

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { updateTask } from '../redux/tasksSlice';
import Container from '../components/Container';
import Input from '../components/Input';
import { Task } from '../types';
import Button from '../components/Button';

interface RouteParams {
  taskId: string;
}

const TaskEditScreen = ({ route, navigation }: { route: { params: RouteParams }, navigation: any }) => {
  const { taskId } = route.params;
  const task = useSelector((state: RootState) =>
    state.tasks.find((task: Task) => task.id === taskId)
  );

  const [title, setTitle] = useState(task?.title || '');
  const [description, setDescription] = useState(task?.description || '');
  const dispatch = useDispatch();

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
    }
  }, [task]);

  const handleSave = () => {
    if (task) {
      dispatch(
        updateTask({
          id: task.id,
          data: {
            title,
            description,
          }
        })
      );
      navigation.goBack();
    }
  };

  return (
    <Container>
      <Input
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />
      <Input
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
      />
      <Button title="Save" onPress={handleSave} />
    </Container>
  );
};

export default TaskEditScreen;
