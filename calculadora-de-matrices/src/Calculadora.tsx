import { useState } from "react";
import './Calculadora.css';

function Calculadora() {
  const [firstMatrix, setFirstMatrix] = useState<number[][][]>([[[0]]]);
  const [secondMatrix, setSecondMatrix] = useState<number[][][]>([[[0]]]);
  const [rows1, setRows1] = useState(3);
  const [cols1, setCols1] = useState(3);
  const [rows2, setRows2] = useState(3);
  const [cols2, setCols2] = useState(3);
  const [depth, setDepth] = useState(2);
  const [is3D, setIs3D] = useState(false); // Para cambiar entre 2D y 3D
  const [resultMatrix, setResultMatrix] = useState<number[][][] | null>(null);

  function generateMatrix(rows: number, cols: number, depth: number = 1): number[][][] {
    return Array.from({ length: depth }, () =>
      Array.from({ length: rows }, () =>
        Array.from({ length: cols }, () => 0)
      )
    );
  }

  const handleResizeMatrix1 = () => {
    setFirstMatrix(generateMatrix(rows1, cols1, is3D ? depth : 1));
    setResultMatrix(null); // Reiniciar el resultado cuando se redimensiona la matriz
  };

  const handleResizeMatrix2 = () => {
    setSecondMatrix(generateMatrix(rows2, cols2, is3D ? depth : 1));
    setResultMatrix(null); // Reiniciar el resultado cuando se redimensiona la matriz
  };

  const updateCell = (
    matrixSetter: React.Dispatch<React.SetStateAction<number[][][]>>,
    matrix: number[][][],
    depthIndex: number,
    rowIndex: number,
    colIndex: number,
    value: number
  ) => {
    const newMatrix = matrix.map((depth, d) =>
      depth.map((row, r) =>
        row.map((cell, c) => (d === depthIndex && r === rowIndex && c === colIndex ? value : cell))
      )
    );
    matrixSetter(newMatrix);
  };

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
    setResultMatrix(result);
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
            value={rows1}
            onChange={(e) => setRows1(Number(e.target.value))}
          />
        </label>
        <label>
          Columnas:
          <input
            type="number"
            value={cols1}
            onChange={(e) => setCols1(Number(e.target.value))}
          />
        </label>
        <label>
          Profundidad:
          <input
            type="number"
            value={depth}
            onChange={(e) => setDepth(Number(e.target.value))}
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
        <button onClick={handleResizeMatrix1}>Redimensionar Matriz 1</button>
      </div>

      <h2>Matriz 1</h2>
      {firstMatrix.map((depth, depthIndex) => (
        <div key={depthIndex}>
          <h3>Profundidad {depthIndex + 1}</h3>
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
                          updateCell(
                            setFirstMatrix,
                            firstMatrix,
                            depthIndex,
                            rowIndex,
                            colIndex,
                            Number(e.target.value)
                          )
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

      <div>
        <h2>Configurar Matriz 2</h2>
        <label>
          Filas:
          <input
            type="number"
            value={rows2}
            onChange={(e) => setRows2(Number(e.target.value))}
          />
        </label>
        <label>
          Columnas:
          <input
            type="number"
            value={cols2}
            onChange={(e) => setCols2(Number(e.target.value))}
          />
        </label>
        <button onClick={handleResizeMatrix2}>Redimensionar Matriz 2</button>
      </div>

      <h2>Matriz 2</h2>
      {secondMatrix.map((depth, depthIndex) => (
        <div key={depthIndex}>
          <h3>Profundidad {depthIndex + 1}</h3>
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
                          updateCell(
                            setSecondMatrix,
                            secondMatrix,
                            depthIndex,
                            rowIndex,
                            colIndex,
                            Number(e.target.value)
                          )
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

      <div>
        <button onClick={addMatrices}>Sumar</button>
        <button onClick={subtractMatrices}>Restar</button>
        <button onClick={multiplyMatrices}>Multiplicar</button>
        <button onClick={divideMatrices}>Dividir</button>
      </div>

      {resultMatrix && (
        <div>
          <h2>Resultado</h2>
          {resultMatrix.map((depth, depthIndex) => (
            <div key={depthIndex}>
              <h3>Profundidad {depthIndex + 1}</h3>
              <table>
                <tbody>
                  {depth.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      {row.map((cell, colIndex) => (
                        <td key={colIndex}>{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Calculadora;
