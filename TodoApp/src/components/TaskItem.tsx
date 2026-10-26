import { Pressable, StyleSheet, Text, View } from "react-native";
import { Task } from "../types/Task";

type TaskItemProps = {
    task: Task;
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
};

export default function TaskItem({ task, onToggle, onDelete }: TaskItemProps) {
    return (
        <View style={styles.container}>
            <Pressable style={styles.taskArea} onPress={() => onToggle(task.id)}>
                <View style={[styles.checkbox, task.completed ? styles.checkboxCompleted : null]}>
                    {task.completed && <Text style={styles.check}>✓</Text>}
                </View>
                <Text style={[styles.title, task.completed ? styles.titleCompleted : null]}>
                    {task.title}
                </Text>
            </Pressable>
            <Pressable style={styles.deleteButton} onPress={() => onDelete(task.id)}>
                <Text style={styles.deleteText}>X</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#ffffff",
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    taskArea: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
    },
    checkbox: {
        width: 24,
        height: 24,
        borderRadius: 6,
        borderWidth: 2,
        borderColor: "#4285F4",
        marginRight: 12,
        justifyContent: "center",
        alignItems: "center",
    },
    checkboxCompleted: {
        backgroundColor: "#4285F4",
    },
    check: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16,
    },
    title: {
        flex: 1,
        fontSize: 17,
        color: "#333",
    },
    titleCompleted: {
        textDecorationLine: "line-through",
        color: "#999999",
    },
    deleteButton: {
        width: 35,
        height: 35,
        justifyContent: "center",
        alignItems: "center",
    },
    deleteText: {
        color: "#FF3B30",
        fontWeight: "bold",
        fontSize: 28,
    },
});