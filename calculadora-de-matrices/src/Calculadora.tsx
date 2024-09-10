import { useState } from "react";
import './Calculadora.css';

function Calculadora() {
    const [firstMatrixRows, setFirstMatrixRows] = useState(3);
    const [firstMatrixCols, setFirstMatrixCols] = useState(3);
    const [firstMatrix, setFirstMatrix] = useState(generateMatrix(3, 3));

    const [secondMatrixRows, setSecondMatrixRows] = useState(3);
    const [secondMatrixCols, setSecondMatrixCols] = useState(3);
    const [secondMatrix, setSecondMatrix] = useState(generateMatrix(3, 3));

    const [resultMatrix, setResultMatrix] = useState<number[][]>([]); // Matriz de resultado

    // Función para generar una matriz de tamaño especificado
    function generateMatrix(rows: number, cols: number): number[][] {
        return Array.from({ length: rows }, () =>
            Array.from({ length: cols }, () => 0)
        );
    }

    // Actualizar el tamaño de la primera matriz
    const handleFirstMatrixResize = () => {
        setFirstMatrix(generateMatrix(firstMatrixRows, firstMatrixCols));
    };

    // Actualizar el tamaño de la segunda matriz
    const handleSecondMatrixResize = () => {
        setSecondMatrix(generateMatrix(secondMatrixRows, secondMatrixCols));
    };

    // Función para actualizar un valor específico en la primera matriz
    const updateFirstMatrixCell = (row: number, col: number, value: number) => {
        const newMatrix = firstMatrix.map((r, rowIndex) =>
            r.map((c, colIndex) => (rowIndex === row && colIndex === col ? value : c))
        );
        setFirstMatrix(newMatrix);
    };

    // Función para actualizar un valor específico en la segunda matriz
    const updateSecondMatrixCell = (row: number, col: number, value: number) => {
        const newMatrix = secondMatrix.map((r, rowIndex) =>
            r.map((c, colIndex) => (rowIndex === row && colIndex === col ? value : c))
        );
        setSecondMatrix(newMatrix);
    };

    // Función para realizar suma
    const handleSum = () => {
        if (firstMatrixRows === secondMatrixRows && firstMatrixCols === secondMatrixCols) {
            const result = firstMatrix.map((row, rowIndex) =>
                row.map((cell, colIndex) => cell + secondMatrix[rowIndex][colIndex])
            );
            setResultMatrix(result);
        } else {
            alert("Las matrices deben tener el mismo tamaño para sumar.");
        }
    };

    // Función para realizar resta
    const handleSubtract = () => {
        if (firstMatrixRows === secondMatrixRows && firstMatrixCols === secondMatrixCols) {
            const result = firstMatrix.map((row, rowIndex) =>
                row.map((cell, colIndex) => cell - secondMatrix[rowIndex][colIndex])
            );
            setResultMatrix(result);
        } else {
            alert("Las matrices deben tener el mismo tamaño para restar.");
        }
    };

    // Función para realizar multiplicación
    const handleMultiply = () => {
        if (firstMatrixCols === secondMatrixRows) {
            const result = generateMatrix(firstMatrixRows, secondMatrixCols);
            for (let i = 0; i < firstMatrixRows; i++) {
                for (let j = 0; j < secondMatrixCols; j++) {
                    let sum = 0;
                    for (let k = 0; k < firstMatrixCols; k++) {
                        sum += firstMatrix[i][k] * secondMatrix[k][j];
                    }
                    result[i][j] = sum;
                }
            }
            setResultMatrix(result);
        } else {
            alert("El número de columnas de la primera matriz debe coincidir con el número de filas de la segunda para multiplicar.");
        }
    };

    // Función para realizar división (elemento a elemento)
    const handleDivide = () => {
        if (firstMatrixRows === secondMatrixRows && firstMatrixCols === secondMatrixCols) {
            const result = firstMatrix.map((row, rowIndex) =>
                row.map((cell, colIndex) => {
                    const divisor = secondMatrix[rowIndex][colIndex];
                    return divisor !== 0 ? cell / divisor : NaN;
                })
            );
            setResultMatrix(result);
        } else {
            alert("Las matrices deben tener el mismo tamaño para dividir.");
        }
    };

    return (
        <div>
            <h1>Calculadora de Matrices</h1>
            
            {/* Primera Matriz */}
            <div>
                <h2>Primera Matriz</h2>
                <div>
                    <label>
                        Filas:
                        <input
                            type="number"
                            value={firstMatrixRows}
                            onChange={(e) => setFirstMatrixRows(Number(e.target.value))}
                        />
                    </label>
                    <label>
                        Columnas:
                        <input
                            type="number"
                            value={firstMatrixCols}
                            onChange={(e) => setFirstMatrixCols(Number(e.target.value))}
                        />
                    </label>
                    <button onClick={handleFirstMatrixResize}>Redimensionar Matriz 1</button>
                </div>

                <table>
                    <tbody>
                        {firstMatrix.map((row, rowIndex) => (
                            <tr key={rowIndex}>
                                {row.map((cell, colIndex) => (
                                    <td key={colIndex}>
                                        <input
                                            type="number"
                                            value={cell}
                                            onChange={(e) => updateFirstMatrixCell(rowIndex, colIndex, Number(e.target.value))}
                                        />
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Segunda Matriz */}
            <div>
                <h2>Segunda Matriz</h2>
                <div>
                    <label>
                        Filas:
                        <input
                            type="number"
                            value={secondMatrixRows}
                            onChange={(e) => setSecondMatrixRows(Number(e.target.value))}
                        />
                    </label>
                    <label>
                        Columnas:
                        <input
                            type="number"
                            value={secondMatrixCols}
                            onChange={(e) => setSecondMatrixCols(Number(e.target.value))}
                        />
                    </label>
                    <button onClick={handleSecondMatrixResize}>Redimensionar Matriz 2</button>
                </div>

                <table>
                    <tbody>
                        {secondMatrix.map((row, rowIndex) => (
                            <tr key={rowIndex}>
                                {row.map((cell, colIndex) => (
                                    <td key={colIndex}>
                                        <input
                                            type="number"
                                            value={cell}
                                            onChange={(e) => updateSecondMatrixCell(rowIndex, colIndex, Number(e.target.value))}
                                        />
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Botones de operaciones */}
            <div>
                <h2>Operaciones</h2>
                <button onClick={handleSum}>Suma</button>
                <button onClick={handleSubtract}>Resta</button>
                <button onClick={handleMultiply}>Multiplicación</button>
                <button onClick={handleDivide}>División</button>
            </div>

            {/* Matriz de resultado */}
            <div>
                <h2>Resultado</h2>
                {resultMatrix.length > 0 && (
                    <table>
                        <tbody>
                            {resultMatrix.map((row, rowIndex) => (
                                <tr key={rowIndex}>
                                    {row.map((cell, colIndex) => (
                                        <td key={colIndex}>
                                            <input type="number" value={cell} readOnly />
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}

export default Calculadora;
