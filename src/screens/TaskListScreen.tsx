import React, { useState } from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { deleteTask } from '../redux/tasksSlice';
import Container from '../components/Container';
import TaskItem from '../components/TaskItem';
import Input from '../components/Input';
import { Task } from '../types';
import Button from '../components/Button';

const TaskListScreen = ({ navigation }: any) => {
  const tasks = useSelector((state: RootState) => state.tasks);
  const [search, setSearch] = useState('');
  const dispatch = useDispatch();

  const filteredTasks = tasks.filter(
    (task: Task) =>
      task.title.toLowerCase().includes(search.toLowerCase()) ||
      task.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Container>
      <Input
        placeholder="Search tasks"
        value={search}
        onChangeText={setSearch}
      />
      <FlatList
        data={filteredTasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('TaskEdit', { taskId: item.id })}
          >
            <TaskItem title={item.title} description={item.description} completed={item.completed} />
            <Button
              title="Delete"
              onPress={() => dispatch(deleteTask(item.id))}
            />
          </TouchableOpacity>
        )}
      />
      <Button
        title="Add Task"
        onPress={() => navigation.navigate('TaskCreate')}
      />
    </Container>
  );
};

export default TaskListScreen;
