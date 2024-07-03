
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../redux/tasksSlice';
import Container from '../components/Container';
import Input from '../components/Input';
import { Task } from '../types';
import Button from '../components/Button';

interface TaskCreateScreenProps {
  navigation: any; 
}

const TaskCreateScreen: React.FC<TaskCreateScreenProps> = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const dispatch = useDispatch();

  const handleAddTask = () => {
    const newTask: Task = {
      id: Math.random().toString(36).substring(7),
      title,
      description,
      completed: false,
      createdAt: '',
      updatedAt: ''
    };

    dispatch(addTask(newTask));
    navigation.goBack();
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
      <Button title="Add Task" onPress={handleAddTask} />
    </Container>
  );
};

export default TaskCreateScreen;
