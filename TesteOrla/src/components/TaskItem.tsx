import React from 'react';
import styled from 'styled-components/native';

const TaskContainer = styled.View`
  padding: 10px;
  border-bottom-width: 1px;
  border-bottom-color: #ccc;
`;

const TaskTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
`;

const TaskDescription = styled.Text`
  font-size: 14px;
  color: #555;
`;

interface TaskItemProps {
  title: string;
  description: string;
  completed: boolean;
  children?: React.ReactNode;
}

const TaskItem: React.FC<TaskItemProps> = ({ title, description, completed, children }) => (
  <TaskContainer>
    <TaskTitle>{title}</TaskTitle>
    <TaskDescription>{description}</TaskDescription>
    {children}
  </TaskContainer>
);

export default TaskItem;
