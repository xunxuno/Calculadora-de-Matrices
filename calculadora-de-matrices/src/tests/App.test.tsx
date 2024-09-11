import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MatrixDisplay } from '../Calculadora';

const mockMatrix: number[][][] = [
  [
    [1, 2],
    [3, 4]
  ],
  [
    [5, 6],
    [7, 8]
  ]
];

describe('MatrixDisplay', () => {
  it('should render matrix with given data', () => {
    const updateCell = jest.fn();
    
    render(
      <MatrixDisplay
        matrix={mockMatrix}
        updateCell={updateCell}
        is3D={true}
      >
        <h3>Contenido Adicional</h3>
      </MatrixDisplay>
    );

    // Verifica que los datos de la matriz estén renderizados
    expect(screen.getByText('Profundidad 1')).toBeInTheDocument();
    expect(screen.getByText('Profundidad 2')).toBeInTheDocument();
    expect(screen.getByDisplayValue('1')).toBeInTheDocument();
    expect(screen.getByDisplayValue('2')).toBeInTheDocument();
    expect(screen.getByDisplayValue('3')).toBeInTheDocument();
    expect(screen.getByDisplayValue('4')).toBeInTheDocument();
    expect(screen.getByDisplayValue('5')).toBeInTheDocument();
    expect(screen.getByDisplayValue('6')).toBeInTheDocument();
    expect(screen.getByDisplayValue('7')).toBeInTheDocument();
    expect(screen.getByDisplayValue('8')).toBeInTheDocument();
  });

  it('should call updateCell on cell change', () => {
    const updateCell = jest.fn();

    render(
      <MatrixDisplay
        matrix={mockMatrix}
        updateCell={updateCell}
        is3D={true}
      />
    );

    fireEvent.change(screen.getByDisplayValue('1'), { target: { value: '10' } });

    expect(updateCell).toHaveBeenCalledWith(0, 0, 0, 10); // Profundidad 0, Fila 0, Columna 0, Nuevo valor 10
  });
});
