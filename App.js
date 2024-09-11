import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList } from 'react-native';

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
      <View style={styles.titleContainer}>
        <Text style={styles.title}>FELICITAS-REDOBLE TODO LIST</Text>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Enter a task"
        placeholderTextColor="#aaa"
        value={task}
        onChangeText={setTask}
      />
      <TouchableOpacity
        style={[styles.button, styles.addButton]}
        onPress={isEditing ? editTask : addTask}
      >
        <Text style={styles.buttonText}>{isEditing ? "Edit Task" : "Add Task"}</Text>
      </TouchableOpacity>

      <FlatList
        style={styles.list}
        data={tasks}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Text style={styles.taskText}>{item.value}</Text>
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
    backgroundColor: '#f0f2f5',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  titleContainer: {
    backgroundColor: '#4CAF50', // Background color
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
    textAlign: 'center',
  },
  input: {
    padding: 12,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  addButton: {
    backgroundColor: '#4CAF50',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  list: {
    marginTop: 20,
  },
  listItem: {
    padding: 15,
    backgroundColor: '#fff',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  buttonGroup: {
    flexDirection: 'row',
  },
  taskText: {
    fontSize: 16,
    color: '#333',
  },
  editButton: {
    color: '#007bff',
    fontWeight: '600',
    marginRight: 15,
  },
  removeButton: {
    color: '#dc3545',
    fontWeight: '600',
  },
});
