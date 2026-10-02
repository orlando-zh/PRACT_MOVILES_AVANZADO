import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

// Props del componente calculador boton
type CalculatorButtonProps = {
    value: string;
    onPress: () => void;
};

// Componente a reutilizar para los botones
function CalculatorButton({ value, onPress }: CalculatorButtonProps) {
    return (
        <Pressable
            style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
            onPress={onPress}
        >
            <Text style={styles.buttonText}>{value}</Text>
        </Pressable>
    );
}

// Componente principal
export default function index() {
    // Estado de la pantalla
    const [display, setDisplay] = useState("0");

    // Primer numero de la operacion
    const [firstNumber, setFirstNumber] = useState<number | null>(null); //[cite: 2]

    // Operacion seleccionada
    const [operator, setOperator] = useState<string | null>(null); //[cite: 2]

    // Manejo de numeros
    const handleNumberPress = (number: string) => {
        if (display === "Error") {
            setDisplay(number);
            return;
        }

        if (display === "0") {
            setDisplay(number);
        } else {
            setDisplay(display + number);
        }
    };

    // Manejar operador
    const handleOperatorsPress = (selectedOperator: string) => {
        setFirstNumber(Number(display));
        setOperator(selectedOperator);
        setDisplay("0");
    };

    // Limpiar calculadora
    const handleClear = () => {
        setDisplay("0");
        setFirstNumber(null);
        setOperator(null);
    };

    // Realizar operacion
    const handleEquals = () => {
        if (firstNumber === null || operator === null) {
            return;
        }

        const secondNumber = Number(display);
        let result = 0;

        switch (operator) {
            case "+":
                result = firstNumber + secondNumber;
                break;
            case "-":
                result = firstNumber - secondNumber;
                break;
            case "x":
                result = firstNumber * secondNumber;
                break;
            case "/":
                if (secondNumber === 0) {
                    setDisplay("Error");
                    setFirstNumber(null);
                    setOperator(null);
                    return;
                }
                result = firstNumber / secondNumber;
                break;
        }

        setDisplay(String(result));
        setFirstNumber(null);
        setOperator(null);
    };

    return (
        /* Contenedor */
        <View style={styles.container}>
            {/* Titulo */}
            <Text style={styles.title}>Calculadora</Text>

            {/* Display */}
            <View style={styles.display}>
                <Text style={styles.displayText}>{display}</Text>
            </View>

            {/* Teclado */}
            <View style={styles.keyboard}>
                {/* Fila 1 */}
                <View style={styles.row}>
                    <CalculatorButton value="7" onPress={() => handleNumberPress("7")} />
                    <CalculatorButton value="8" onPress={() => handleNumberPress("8")} />
                    <CalculatorButton value="9" onPress={() => handleNumberPress("9")} />
                    <CalculatorButton value="/" onPress={() => handleOperatorsPress("/")} />
                </View>

                {/* Fila 2 */}
                <View style={styles.row}>
                    <CalculatorButton value="4" onPress={() => handleNumberPress("4")} />
                    <CalculatorButton value="5" onPress={() => handleNumberPress("5")} />
                    <CalculatorButton value="6" onPress={() => handleNumberPress("6")} />
                    <CalculatorButton value="x" onPress={() => handleOperatorsPress("x")} />
                </View>

                {/* Fila 3 */}
                <View style={styles.row}>
                    <CalculatorButton value="1" onPress={() => handleNumberPress("1")} />
                    <CalculatorButton value="2" onPress={() => handleNumberPress("2")} />
                    <CalculatorButton value="3" onPress={() => handleNumberPress("3")} />
                    <CalculatorButton value="-" onPress={() => handleOperatorsPress("-")} />
                </View>

                {/* Fila 4 */}
                <View style={styles.row}>
                    <CalculatorButton value="0" onPress={() => handleNumberPress("0")} />
                    <CalculatorButton value="C" onPress={handleClear} />
                    <CalculatorButton value="=" onPress={handleEquals} />
                    <CalculatorButton value="+" onPress={() => handleOperatorsPress("+")} />
                </View>
            </View>
        </View>
    ); //
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    display: {
        height: 100,
        justifyContent: 'center',
        alignItems: 'flex-end',
        padding: 20,
        backgroundColor: '#eeeeee',
        marginBottom: 20,
    },
    displayText: {
        fontSize: 40,
    },
    keyboard: {
        gap: 10,
    },
    row: {
        flexDirection: 'row',
        gap: 10,
    },
    // Estilos adaptados para funcionar con el Pressable
    button: {
        flex: 1,
        height: 70,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#dddddd',
        borderRadius: 8,
    },
    buttonPressed: {
        backgroundColor: '#cccccc',
    },
    buttonText: {
        fontSize: 28,
    }
});