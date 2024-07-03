import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import TaskEditScreen from '../screens/TaskEditScreen';
import TaskCreateScreen from '../screens/TaskCreateScreen';
import TaskListScreen from '../screens/TaskListScreen';

export type RootStackParamList = {
  TaskList: undefined;
  TaskCreate: undefined;
  TaskEdit: {taskId: string};
};

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="TaskList">
        <Stack.Screen
          name="TaskList"
          component={TaskListScreen}
          options={{title: 'Tasks'}}
        />
        <Stack.Screen
          name="TaskCreate"
          component={TaskCreateScreen}
          options={{title: 'Create Task'}}
        />
        <Stack.Screen
          name="TaskEdit"
          component={TaskEditScreen}
          options={{title: 'Edit Task'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
