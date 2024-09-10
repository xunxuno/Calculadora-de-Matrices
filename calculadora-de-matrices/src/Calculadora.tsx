import { useState } from "react";
import Button from './Button';
import './Calculadora.css';

function Calculadora() {
    const [firstMatrix, setFirstMatrix] = useState<number[][]>([]);
    const [secondMatrix, setSecondMatrix] = useState<string>('0');
    const [operator, setOperator] = useState<string | null>(null);

    // Definiendo DynamicMatrix dentro de Calculadora
    function DynamicMatrix() {
        const [rows, setRows] = useState(3);
        const [cols, setCols] = useState(3);
        const [matrix, setMatrix] = useState(generateMatrix(3, 3));

        // Función para generar una matriz de tamaño especificado
        function generateMatrix(rows: number, cols: number): number[][] {
            return Array.from({ length: rows }, () =>
                Array.from({ length: cols }, () => 0)
            );
        }

        // Actualizar el tamaño de la matriz cuando cambian filas o columnas
        const handleResize = () => {
            setMatrix(generateMatrix(rows, cols));
        };

        // Función para actualizar un valor específico en la matriz
        const updateCell = (row: number, col: number, value: number) => {
            const newMatrix = matrix.map((r, rowIndex) =>
                r.map((c, colIndex) => (rowIndex === row && colIndex === col ? value : c))
            );
            setMatrix(newMatrix);
        };

        return (
            <div>
                <h1>Matriz Dinámica</h1>

                {/* Inputs para ajustar el tamaño de la matriz */}
                <div>
                    <label>
                        Filas:
                        <input
                            type="number"
                            value={rows}
                            onChange={(e) => setRows(Number(e.target.value))}
                        />
                    </label>
                    <label>
                        Columnas:
                        <input
                            type="number"
                            value={cols}
                            onChange={(e) => setCols(Number(e.target.value))}
                        />
                    </label>
                    <button onClick={handleResize}>Redimensionar Matriz</button>
                </div>

                {/* Renderizar la matriz */}
                <table>
                    <tbody>
                        {matrix.map((row, rowIndex) => (
                            <tr key={rowIndex}>
                                {row.map((cell, colIndex) => (
                                    <td key={colIndex}>
                                        <input
                                            type="number"
                                            value={cell}
                                            onChange={(e) => updateCell(rowIndex, colIndex, Number(e.target.value))}
                                        />
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }

    // Renderizar Calculadora junto con DynamicMatrix
    return (
        <div>
            <h1>Calculadora de Matrices</h1>
            <DynamicMatrix />
        </div>
    );
}

export default Calculadora;
