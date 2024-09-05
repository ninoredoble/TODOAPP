import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList, TouchableOpacity } from 'react-native';

export default function App() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingKey, setEditingKey] = useState(null);

  const addTask = () => {
    if (task.trim()) {
      setTasks([...tasks, { key: Math.random().toString(), value: task }]);
      setTask('');
    }
  };

  const editTask = () => {
    setTasks(tasks.map(t => t.key === editingKey ? { key: editingKey, value: task } : t));
    setTask('');
    setIsEditing(false);
    setEditingKey(null);
  };

  const startEditing = (taskKey, taskValue) => {
    setTask(taskValue);
    setIsEditing(true);
    setEditingKey(taskKey);
  };

  const removeTask = (taskKey) => {
    setTasks(tasks.filter((task) => task.key !== taskKey));
    if (isEditing && editingKey === taskKey) {
      setTask('');
      setIsEditing(false);
      setEditingKey(null);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>FELICITAS REDOBLE TODO LIST</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter a task"
        value={task}
        onChangeText={setTask}
      />
      <Button title={isEditing ? "Edit Task" : "Add Task"} onPress={isEditing ? editTask : addTask} />

      <FlatList
        style={styles.list}
        data={tasks}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Text>{item.value}</Text>
            <View style={styles.buttonGroup}>
              <TouchableOpacity onPress={() => startEditing(item.key, item.value)}>
                <Text style={styles.editButton}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => removeTask(item.key)}>
                <Text style={styles.removeButton}>Remove</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
  },
  list: {
    marginTop: 20,
  },
  listItem: {
    padding: 15,
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttonGroup: {
    flexDirection: 'row',
  },
  editButton: {
    color: '#007bff',
    fontWeight: 'bold',
    marginRight: 15,
  },
  removeButton: {
    color: '#dc3545',
    fontWeight: 'bold',
  },
});
