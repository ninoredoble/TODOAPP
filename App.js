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
      setTasks([...tasks, { key: Math.random().toString(), value: task, completed: false, importance: 0 }]);
      setTask('');
    }
  };

  const editTask = () => {
    setTasks(tasks.map(t => t.key === editingKey ? { ...t, value: task } : t));
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

  const completeTask = (taskKey) => {
    setTasks(tasks.map(t => t.key === taskKey ? { ...t, completed: !t.completed } : t));
  };

  const increaseImportance = (taskKey) => {
    setTasks(tasks.map(t => t.key === taskKey ? { ...t, importance: t.importance + 1 } : t));
  };

  const decreaseImportance = (taskKey) => {
    setTasks(tasks.map(t => t.key === taskKey ? { ...t, importance: Math.max(t.importance - 1, 0) } : t));
  };

  // Sort tasks by importance (descending) before rendering
  const sortedTasks = [...tasks].sort((a, b) => b.importance - a.importance);

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>FELICITAS REDOBLE TODO LIST</Text>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Enter a task"
        placeholderTextColor="#6C757D"
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
    backgroundColor: '#F8F9FA',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  titleContainer: {
    backgroundColor: '#007BFF',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#F8F9FA',
    textAlign: 'center',
  },
  input: {
    padding: 12,
    borderColor: '#007BFF',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    backgroundColor: '#F5F5F5',
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginHorizontal: 4,
  },
  addButton: {
    backgroundColor: '#007BFF',
  },
  buttonText: {
    color: '#F8F9FA',
    fontSize: 14, // Lowered font size for buttons
    fontWeight: '600',
  },
  list: {
    marginTop: 20,
  },
  listItem: {
    padding: 15,
    backgroundColor: '#F5F5F5',
    borderColor: '#E0E0E0',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  completedTask: {
    backgroundColor: '#28A745',
  },
  completedTaskText: {
    textDecorationLine: 'line-through',
    color: '#F8F9FA',
  },
  importanceButtons: {
    flexDirection: 'column',
    alignItems: 'center',
    marginRight: 10,
  },
  importanceButton: {
    padding: 4,
    borderRadius: 4,
    backgroundColor: '#E0E0E0',
    marginVertical: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  importanceText: {
    fontSize: 16,
    color: '#007BFF',
  },
  taskContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  taskText: {
    flex: 1,
    fontSize: 16,
    color: '#212529',
  },
  buttonGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  finishedButton: {
    backgroundColor: '#007BFF',
  },
  unfinishedButton: {
    backgroundColor: '#F5F5F5',
  },
  editButton: {
    color: '#007BFF',
    fontWeight: '600',
    marginHorizontal: 10,
  },
  removeButton: {
    color: '#DC3545',
    fontWeight: '600',
    marginHorizontal: 10,
  },
});
