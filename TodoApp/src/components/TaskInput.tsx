import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

type TaskInputProps = {
    onAddTask: (title: string) => void;
};

export default function TaskInput({ onAddTask }: TaskInputProps) {
    const [text, setText] = useState('');

    const handleAddTask = () => {
        const cleanText = text.trim();
        if (cleanText === '') {
            return;
        }
        onAddTask(cleanText);
        setText('');
    };

    return (
        <View style={styles.container}>
            <TextInput
                onChangeText={setText}
                placeholder="Nueva tarea..."
                style={styles.input} value={text}
            />
            <Pressable onPress={handleAddTask} style={styles.button}>
                <Text style={styles.buttonText}>+</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        gap: 10,
        marginBottom: 20,
    },
    input: {
        flex: 1,
        height: 50,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        paddingHorizontal: 15,
        fontSize: 16,
        backgroundColor: '#fff',
    },
    button: {
        width: 50,
        height: 50,
        borderRadius: 10,
        backgroundColor: '#007AFF',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 30,
        lineHeight: 32,
    },
});
