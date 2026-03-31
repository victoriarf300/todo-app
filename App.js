import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { ThemeProvider, Text, Input, Button, CheckBox } from "@rneui/themed";

export default function App() {
  const [tasks, setTasks] = useState([
    {
      key: "1",
      description: "Finish homework",
      completed: false,
      deadline: "04/02/2026",
    },
    {
      key: "2",
      description: "Clean room",
      completed: true,
      deadline: "04/03/2026",
    },
    {
      key: "3",
      description: "Study React Native",
      completed: false,
      deadline: "04/05/2026",
    },
  ]);

  const [newTask, setNewTask] = useState("");
  const [deadline, setDeadline] = useState("");
  const [hideCompleted, setHideCompleted] = useState(false);

  const addTask = () => {
    if (newTask.trim() === "") return;

    const taskToAdd = {
      key: Date.now().toString(),
      description: newTask.trim(),
      completed: false,
      deadline: deadline.trim() || "No deadline",
    };

    setTasks((prevTasks) => [...prevTasks, taskToAdd]);
    setNewTask("");
    setDeadline("");
  };

  const toggleTask = (key) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.key === key ? { ...task, completed: !task.completed } : task,
      ),
    );
  };

  const deleteTask = (key) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.key !== key));
  };

  const filteredTasks = hideCompleted
    ? tasks.filter((task) => !task.completed)
    : tasks;

  const renderItem = ({ item }) => (
    <View style={styles.taskCard}>
      <CheckBox
        checked={item.completed}
        onPress={() => toggleTask(item.key)}
        containerStyle={styles.checkboxContainer}
      />

      <View style={styles.taskInfo}>
        <Text
          style={[
            styles.taskText,
            item.completed ? styles.completedText : null,
          ]}
        >
          {item.description}
        </Text>
        <Text style={styles.dateText}>{item.deadline}</Text>
      </View>

      <TouchableOpacity
        onPress={() => deleteTask(item.key)}
        style={styles.deleteButton}
      >
        <Text style={styles.deleteText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <ThemeProvider>
      <SafeAreaView style={styles.container}>
        {}
        <View style={styles.header}>
          <Text style={styles.subText}>Logged in as victoria</Text>
          <Text style={styles.headerText}>Tasks</Text>
        </View>

        {}
        <View style={styles.card}>
          <Text style={styles.label}>Task Description</Text>
          <Input
            placeholder="Enter task description"
            value={newTask}
            onChangeText={setNewTask}
            onSubmitEditing={addTask}
            inputContainerStyle={styles.inputBox}
          />

          <Text style={styles.label}>Deadline (optional)</Text>
          <Input
            placeholder="mm/dd/yyyy"
            value={deadline}
            onChangeText={setDeadline}
            inputContainerStyle={styles.inputBox}
          />

          <Button
            title="Add Task"
            onPress={addTask}
            containerStyle={styles.button}
            buttonStyle={{ backgroundColor: "#000" }}
          />
        </View>

        {}
        <CheckBox
          title="Hide completed tasks"
          checked={hideCompleted}
          onPress={() => setHideCompleted(!hideCompleted)}
          containerStyle={styles.hideBox}
        />

        {}
        <FlatList
          data={filteredTasks}
          renderItem={renderItem}
          keyExtractor={(item) => item.key}
        />
      </SafeAreaView>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f2f2f2",
  },

  header: {
    backgroundColor: "#000",
    padding: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginBottom: 20,
  },

  headerText: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
    marginTop: 8,
  },

  subText: {
    color: "#ccc",
    fontSize: 14,
  },

  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },

  label: {
    fontSize: 14,
    marginBottom: 6,
    color: "#333",
  },

  inputBox: {
    backgroundColor: "#fff",
    borderBottomWidth: 0,
    borderRadius: 8,
    paddingHorizontal: 10,
  },

  button: {
    marginTop: 10,
    borderRadius: 8,
  },

  hideBox: {
    backgroundColor: "transparent",
    borderWidth: 0,
    padding: 0,
    marginLeft: 0,
    marginBottom: 10,
  },

  taskCard: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    marginVertical: 6,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 5,
    elevation: 2,
  },

  checkboxContainer: {
    padding: 0,
    margin: 0,
    marginRight: 6,
  },

  taskInfo: {
    flex: 1,
  },

  taskText: {
    fontSize: 18,
  },

  completedText: {
    textDecorationLine: "line-through",
    textDecorationStyle: "solid",
    color: "gray",
  },

  dateText: {
    fontSize: 12,
    color: "gray",
    marginTop: 4,
  },

  deleteButton: {
    backgroundColor: "#000",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 6,
  },

  deleteText: {
    color: "#fff",
    fontSize: 11,
  },
});
