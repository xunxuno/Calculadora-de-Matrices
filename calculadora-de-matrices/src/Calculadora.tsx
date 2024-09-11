import React, { useState, useEffect, ReactNode } from "react";
import { inv } from 'mathjs';
import { z } from 'zod';
import './Calculadora.css';

// Esquema de Zod para validar la configuración de matrices
const matrixSchema = z.object({
  rows: z.number().min(1, "Las filas deben ser al menos 1").max(10, "Máximo 10 filas permitidas"),
  cols: z.number().min(1, "Las columnas deben ser al menos 1").max(10, "Máximo 10 columnas permitidas"),
  depth: z.number().optional(),
  is3D: z.boolean().optional(),
});

type MatrixProps = {
  matrix: number[][][],
  updateCell: (
    depthIndex: number,
    rowIndex: number,
    colIndex: number,
    value: number
  ) => void,
  is3D: boolean,
  children?: ReactNode
};

const MatrixDisplay: React.FC<MatrixProps> = ({ matrix, updateCell, is3D, children }) => {
  return (
    <div>
      {children}
      {matrix.map((depth, depthIndex) => (
        <div key={depthIndex}>
          {is3D && <h3>Profundidad {depthIndex + 1}</h3>}
          <table>
            <tbody>
              {depth.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell, colIndex) => (
                    <td key={colIndex}>
                      <input
                        type="number"
                        value={cell}
                        onChange={(e) =>
                          updateCell(depthIndex, rowIndex, colIndex, Number(e.target.value))
                        }
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

function Calculadora() {
  const [firstMatrix, setFirstMatrix] = useState<number[][][]>([[[0]]]);
  const [secondMatrix, setSecondMatrix] = useState<number[][][]>([[[0]]]);
  const [rows1, setRows1] = useState(3);
  const [cols1, setCols1] = useState(3);
  const [rows2, setRows2] = useState(3);
  const [cols2, setCols2] = useState(3);
  const [depth, setDepth] = useState(2);
  const [is3D, setIs3D] = useState(false);
  const [resultMatrix, setResultMatrix] = useState<number[][][] | null>(null);

  // Generar matriz
  function generateMatrix(rows: number, cols: number, depth: number = 1): number[][][] {
    return Array.from({ length: depth }, () =>
      Array.from({ length: rows }, () =>
        Array.from({ length: cols }, () => 0)
      )
    );
  }

  // Validación de la configuración de las matrices usando Zod
  const validateMatrixConfig = (rows: number, cols: number, depth: number, is3D: boolean) => {
    const validationResult = matrixSchema.safeParse({
      rows,
      cols,
      depth: is3D ? depth : undefined,
      is3D,
    });

    if (!validationResult.success) {
      alert(validationResult.error.errors.map((error) => error.message).join("\n"));
      return false;
    }
    return true;
  };

  // useEffect para redimensionar automáticamente la Matriz 1
  useEffect(() => {
    if (validateMatrixConfig(rows1, cols1, depth, is3D)) {
      setFirstMatrix(generateMatrix(rows1, cols1, is3D ? depth : 1));
      setResultMatrix(null);
    }
  }, [rows1, cols1, depth, is3D]);

  // useEffect para redimensionar automáticamente la Matriz 2
  useEffect(() => {
    if (validateMatrixConfig(rows2, cols2, depth, is3D)) {
      setSecondMatrix(generateMatrix(rows2, cols2, is3D ? depth : 1));
      setResultMatrix(null);
    }
  }, [rows2, cols2, depth, is3D]);

  // Funciones de actualización de celdas
  const updateCellFirstMatrix = (
    depthIndex: number,
    rowIndex: number,
    colIndex: number,
    value: number
  ) => {
    const newMatrix = firstMatrix.map((depth, d) =>
      depth.map((row, r) =>
        row.map((cell, c) => (d === depthIndex && r === rowIndex && c === colIndex ? value : cell))
      )
    );
    setFirstMatrix(newMatrix);
  };

  const updateCellSecondMatrix = (
    depthIndex: number,
    rowIndex: number,
    colIndex: number,
    value: number
  ) => {
    const newMatrix = secondMatrix.map((depth, d) =>
      depth.map((row, r) =>
        row.map((cell, c) => (d === depthIndex && r === rowIndex && c === colIndex ? value : cell))
      )
    );
    setSecondMatrix(newMatrix);
  };

  // Funciones de operaciones entre matrices
  const checkDimensionsForAddition = () => {
    return (
      firstMatrix.length === secondMatrix.length &&
      firstMatrix[0].length === secondMatrix[0].length &&
      firstMatrix[0][0].length === secondMatrix[0][0].length
    );
  };

  const checkDimensionsForMultiplication = () => {
    return (
      firstMatrix[0][0].length === secondMatrix[0].length
    );
  };

  const addMatrices = () => {
    if (!checkDimensionsForAddition()) {
      alert("Las matrices deben tener las mismas dimensiones para sumar.");
      return;
    }
    const result = firstMatrix.map((depth, depthIndex) =>
      depth.map((row, rowIndex) =>
        row.map((cell, colIndex) =>
          cell + secondMatrix[depthIndex][rowIndex][colIndex]
        )
      )
    );
    console.log("Resultado de la suma:", result); // Imprime el resultado en la consola
    setResultMatrix(result);
  };

  const subtractMatrices = () => {
    if (!checkDimensionsForAddition()) {
      alert("Las matrices deben tener las mismas dimensiones para restar.");
      return;
    }
    const result = firstMatrix.map((depth, depthIndex) =>
      depth.map((row, rowIndex) =>
        row.map((cell, colIndex) =>
          cell - secondMatrix[depthIndex][rowIndex][colIndex]
        )
      )
    );
    console.log("Resultado de la resta:", result); // Imprime el resultado en la consola
    setResultMatrix(result);
  };

  const multiplyMatrices = () => {
    if (!checkDimensionsForMultiplication()) {
      alert("El número de columnas de la primera matriz debe ser igual al número de filas de la segunda matriz.");
      return;
    }

    const result = firstMatrix.map((_, depthIndex) =>
      Array.from({ length: rows1 }, (_, rowIndex) =>
        Array.from({ length: cols2 }, (_, colIndex) => {
          let sum = 0;
          for (let k = 0; k < cols1; k++) {
            sum += firstMatrix[depthIndex][rowIndex][k] * secondMatrix[depthIndex][k][colIndex];
          }
          return sum;
        })
      )
    );
    console.log("Resultado de la multiplicación:", result); // Imprime el resultado en la consola
    setResultMatrix(result);
  };

  const divideMatrices = () => {
    if (!checkDimensionsForAddition()) {
      alert("Las matrices deben tener las mismas dimensiones para dividir.");
      return;
    }
    const result = firstMatrix.map((depth, depthIndex) =>
      depth.map((row, rowIndex) =>
        row.map((cell, colIndex) =>
          secondMatrix[depthIndex][rowIndex][colIndex] !== 0
            ? cell / secondMatrix[depthIndex][rowIndex][colIndex]
            : 0 // Evitar división por 0
        )
      )
    );
    console.log("Resultado de la división:", result); // Imprime el resultado en la consola
    setResultMatrix(result);
  };

  const invertMatrix = (matrix: number[][]) => {
    try {
      const invertedMatrix = inv(matrix);
      console.log("Resultado de la inversa:", invertedMatrix); // Imprime el resultado en la consola
      setResultMatrix([invertedMatrix]);
    } catch (error) {
      alert("No se puede calcular la inversa de esta matriz. Asegúrate de que sea cuadrada y tenga un determinante distinto de 0.");
    }
  };

  return (
    <div>
      <h1>Calculadora de Matrices</h1>

      <div>
        <h2>Configurar Matriz 1</h2>
        <label>
          Filas:
          <input
            type="number"
            min="1"
            value={rows1}
            onChange={(e) => setRows1(Math.max(Number(e.target.value), 1))}
          />
        </label>
        <label>
          Columnas:
          <input
            type="number"
            min="1"
            value={cols1}
            onChange={(e) => setCols1(Math.max(Number(e.target.value), 1))}
          />
        </label>
        <label>
          Profundidad:
          <input
            type="number"
            value={depth}
            onChange={(e) => setDepth(Math.max(Number(e.target.value), 1))}
            disabled={!is3D}
          />
        </label>
        <label>
          ¿3D?
          <input
            type="checkbox"
            checked={is3D}
            onChange={() => setIs3D(!is3D)}
          />
        </label>
        <button onClick={() => invertMatrix(firstMatrix[0])}>Inversa Matriz 1</button>
      </div>

      <h2>Matriz 1</h2>
      <MatrixDisplay
        matrix={firstMatrix}
        updateCell={updateCellFirstMatrix}
        is3D={is3D}
      >
        <h3>Contenido Adicional para Matriz 1</h3>
      </MatrixDisplay>

      <div>
        <h2>Configurar Matriz 2</h2>
        <label>
          Filas:
          <input
            type="number"
            min="1"
            value={rows2}
            onChange={(e) => setRows2(Math.max(Number(e.target.value), 1))}
          />
        </label>
        <label>
          Columnas:
          <input
            type="number"
            min="1"
            value={cols2}
            onChange={(e) => setCols2(Math.max(Number(e.target.value), 1))}
          />
        </label>
        <button onClick={() => invertMatrix(secondMatrix[0])}>Inversa Matriz 2</button>
      </div>

      <h2>Matriz 2</h2>
      <MatrixDisplay
        matrix={secondMatrix}
        updateCell={updateCellSecondMatrix}
        is3D={is3D}
      >
        <h3>Contenido Adicional para Matriz 2</h3>
      </MatrixDisplay>

      <div>
        <h2>Operaciones</h2>
        <button onClick={addMatrices}>Sumar</button>
        <button onClick={subtractMatrices}>Restar</button>
        <button onClick={multiplyMatrices}>Multiplicar</button>
        <button onClick={divideMatrices}>Dividir</button>
      </div>

      {resultMatrix && (
        <div>
          <h2>Resultado</h2>
          <MatrixDisplay matrix={resultMatrix} updateCell={() => {}} is3D={is3D} />
        </div>
      )}
    </div>
  );
}

export default Calculadora;
export { MatrixDisplay };
