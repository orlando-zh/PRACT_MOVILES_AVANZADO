import { useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import TaskInput from '../components/TaskInput';
import TaskItem from '../components/TaskItem';
import { Task } from '../types/Task';

export default function index() {
    const [tasks, setTasks] = useState<Task[]>([]);

    const handleAddTask = (title: string) => {
        const newTask: Task = {
            id: Date.now().toString(),
            title: title,
            completed: false,
        };

        setTasks((currentTasks) => [...currentTasks, newTask]);
    };

    const handleToggleTask = (id: string) => {
        setTasks((currentTasks) =>
            currentTasks.map((task) =>
                task.id === id
                    ? {
                        ...task,
                        completed: !task.completed,
                    }
                    : task
            )
        );
    };

    const handleDeleteTask = (id: string) => {
        setTasks((currentTasks) => currentTasks.filter((task) => task.id !== id));
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Mis tareas</Text>

            <Text style={styles.subtitle}>Organiza tus actividades</Text>

            <TaskInput onAddTask={handleAddTask} />

            <FlatList
                data={tasks}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TaskItem
                        task={item}
                        onToggle={handleToggleTask}
                        onDelete={handleDeleteTask}
                    />
                )}
                ListEmptyComponent={
                    <Text style={styles.emptyText}>No tienes tareas pendientes</Text>
                }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        paddingTop: 60,
        backgroundColor: "#f5f5f5",
    },

    title: {
        fontSize: 32,
        fontWeight: "bold",
        color: "#222222",
    },

    subtitle: {
        fontSize: 16,
        color: "#777777",
        marginTop: 5,
        marginBottom: 20,
    },

    emptyText: {
        textAlign: "center",
        marginTop: 40,
        fontSize: 16,
        color: "#999999",
    },
});