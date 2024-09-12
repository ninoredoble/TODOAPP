import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList } from 'react-native';

export default function App() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingKey, setEditingKey] = useState(null);
  const [search, setSearch] = useState('');
  const [filteredTasks, setFilteredTasks] = useState([]);

  const addTask = () => {
    if (task.trim()) {
      const newTask = { key: Math.random().toString(), value: task, completed: false, importance: 0 };
      const updatedTasks = [...tasks, newTask];
      setTasks(updatedTasks);
      setFilteredTasks(updatedTasks);
      setTask('');
    }
  };

  const editTask = () => {
    const updatedTasks = tasks.map(t => t.key === editingKey ? { ...t, value: task } : t);
    setTasks(updatedTasks);
    setFilteredTasks(updatedTasks);
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
    const updatedTasks = tasks.filter((task) => task.key !== taskKey);
    setTasks(updatedTasks);
    setFilteredTasks(updatedTasks);
    if (isEditing && editingKey === taskKey) {
      setTask('');
      setIsEditing(false);
      setEditingKey(null);
    }
  };

  const completeTask = (taskKey) => {
    const updatedTasks = tasks.map(t => t.key === taskKey ? { ...t, completed: !t.completed } : t);
    setTasks(updatedTasks);
    setFilteredTasks(updatedTasks);
  };

  const increaseImportance = (taskKey) => {
    const updatedTasks = tasks.map(t => t.key === taskKey ? { ...t, importance: t.importance + 1 } : t);
    setTasks(updatedTasks);
    setFilteredTasks(updatedTasks);
  };

  const decreaseImportance = (taskKey) => {
    const updatedTasks = tasks.map(t => t.key === taskKey ? { ...t, importance: Math.max(t.importance - 1, 0) } : t);
    setTasks(updatedTasks);
    setFilteredTasks(updatedTasks);
  };

  const handleSearch = (text) => {
    setSearch(text);
    const filtered = tasks.filter((task) => task.value.toLowerCase().includes(text.toLowerCase()));
    setFilteredTasks(filtered);
  };

  // Sort tasks by importance (descending) before rendering
  const sortedTasks = [...filteredTasks].sort((a, b) => b.importance - a.importance);

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>REDOBLE-FELICITAS TO DO LIST</Text>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Enter a task"
        placeholderTextColor="lightgray"
        value={task}
        onChangeText={setTask}
      />
      <TouchableOpacity
        style={[styles.button, styles.addButton]}
        onPress={isEditing ? editTask : addTask}
      >
        <Text style={styles.buttonText}>{isEditing ? "Edit Task" : "Add Task"}</Text>
      </TouchableOpacity>
      
      <TextInput
        style={styles.input}
        placeholder="Search tasks"
        placeholderTextColor="lightgray"
        value={search}
        onChangeText={handleSearch}
      />

      <FlatList
        style={styles.list}
        data={sortedTasks}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => (
          <View style={[styles.listItem, item.completed && styles.completedTask]}>
            <View style={styles.importanceButtons}>
              <TouchableOpacity
                style={styles.importanceButton}
                onPress={() => increaseImportance(item.key)}
              >
                <Text style={styles.importanceText}>⬆️</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.importanceButton}
                onPress={() => decreaseImportance(item.key)}
              >
                <Text style={styles.importanceText}>⬇️</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.taskContainer}>
              <Text style={[styles.taskText, item.completed && styles.completedTaskText]}>{item.value}</Text>
              <View style={styles.buttonGroup}>
                <TouchableOpacity
                  style={[styles.button, item.completed ? styles.finishedButton : styles.unfinishedButton]}
                  onPress={() => completeTask(item.key)}
                >
                  <Text style={styles.buttonText}>{item.completed ? "Finished" : "Unfinished"}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => startEditing(item.key, item.value)}>
                  <Text style={[styles.buttonText, styles.editButton]}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => removeTask(item.key)}>
                  <Text style={[styles.buttonText, styles.removeButton]}>Remove</Text>
                </TouchableOpacity>
              </View>
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
    backgroundColor: '#EEF7FF',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  titleContainer: {
    backgroundColor: 'steelblue',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: 'gray',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
    alignItems: 'center',
  },
  title: {
    fontSize: 23,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  input: {
    padding: 12,
    borderColor: 'steelblue',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    backgroundColor: 'white',
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: 'gray',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginHorizontal: 4,
  },
  addButton: {
    backgroundColor: 'steelblue',
  },
  buttonText: {
    color: 'white',
    fontSize: 13,
    fontWeight: '600',
  },
  list: {
    marginTop: 20,
  },
  listItem: {
    padding: 15,
    backgroundColor: '#F8EDED',
    borderColor: 'lightgray',
    borderWidth: 2,
    borderRadius: 8,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: 'gray',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  completedTask: {
    backgroundColor: '#D5ED9F',
  },
  completedTaskText: {
    textDecorationLine: 'line-through',
    color: 'gray',
  },
  importanceButtons: {
    flexDirection: 'column',
    alignItems: 'center',
    marginRight: 10,
  },
  importanceButton: {
    padding: 2,
    paddingRight: 4,
    borderRadius: 4,
    marginVertical: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  importanceText: {
    fontSize: 14,
    color: 'steelblue',
  },
  taskContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  taskText: {
    flex: 1,
    fontSize: 14,
    color: 'black',
  },
  buttonGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  finishedButton: {
    backgroundColor: '#97BE5A',
  },
  unfinishedButton: {
    backgroundColor: '#EE4E4E',
  },
  editButton: {
    color: 'steelblue',
    fontWeight: '600',
    marginHorizontal: 10,
  },
  removeButton: {
    color: 'red',
    fontWeight: '600',
    marginHorizontal: 10,
  },
});