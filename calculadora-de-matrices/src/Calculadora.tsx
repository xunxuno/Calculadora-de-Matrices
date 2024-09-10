import { useState } from "react";
import './Calculadora.css';

function Calculadora() {
    const [firstMatrixRows, setFirstMatrixRows] = useState(3);
    const [firstMatrixCols, setFirstMatrixCols] = useState(3);
    const [firstMatrix, setFirstMatrix] = useState(generateMatrix(3, 3));

    const [secondMatrixRows, setSecondMatrixRows] = useState(3);
    const [secondMatrixCols, setSecondMatrixCols] = useState(3);
    const [secondMatrix, setSecondMatrix] = useState(generateMatrix(3, 3));

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
        </div>
    );
}

export default Calculadora;
