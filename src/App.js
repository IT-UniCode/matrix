import { useState } from 'react';

const DEFAULT_MATRIX = new Array(10).fill([]).map((_, index) => {
  const row = [];
  for (let col = 0; col < 10; col++) {
    row.push({
      x: col,
      y: index,
      checked: false,
    });
  }

  return row;
});

function App() {
  const [matrix, setMatrix] = useState(DEFAULT_MATRIX);

  const [extremeValues, setExtremeValues] = useState({
    down: {
      x: 0,
      y: 0,
      checked: true,
    },
    selected: false,
  });

  const fillCells = (overCol, selectedCol = extremeValues.down) => {
    const copyMatrix = [...matrix];

    if (selectedCol.y === overCol.y && selectedCol.x === overCol.x) {
      copyMatrix[overCol.y][overCol.x].checked = !copyMatrix[overCol.y][
        overCol.x
      ].checked;
    } else {
      copyMatrix.forEach((row, rowIndex) => {
        if (rowIndex >= selectedCol.y && rowIndex <= overCol.y) {
          row.forEach((_, colIndex) => {
            if (colIndex >= selectedCol.x && colIndex <= overCol.x) {
              copyMatrix[rowIndex][colIndex].checked = !selectedCol.checked;
            }
            if (colIndex <= selectedCol.x && colIndex >= overCol.x) {
              copyMatrix[rowIndex][colIndex].checked = !selectedCol.checked;
            }
          });
        }

        if (rowIndex >= overCol.y && rowIndex <= selectedCol.y) {
          row.forEach((_, colIndex) => {
            if (colIndex <= selectedCol.x && colIndex >= overCol.x) {
              copyMatrix[rowIndex][colIndex].checked = !selectedCol.checked;
            }
            if (colIndex >= selectedCol.x && colIndex <= overCol.x) {
              copyMatrix[rowIndex][colIndex].checked = !selectedCol.checked;
            }
          });
        }
      });
    }
    setMatrix(copyMatrix);
  };

  return (
    <div className="App">
      <table
        style={{ borderCollapse: 'collapse' }}
        onMouseLeave={() => {
          if (extremeValues.selected) {
            setExtremeValues((prev) => ({
              ...prev,
              selected: false,
            }));
          }
        }}
      >
        {matrix.map((row) => (
          <tr>
            {row.map((col) => (
              <td
                onMouseOver={() => {
                  if (extremeValues.selected) {
                    fillCells(col);
                  }
                }}
                onMouseDown={() => {
                  setExtremeValues((prev) => ({
                    ...prev,
                    down: {
                      x: col.x,
                      y: col.y,
                      checked: col.checked,
                    },
                    selected: true,
                  }));
                }}
                onMouseUp={() => {
                  setExtremeValues((prev) => ({
                    ...prev,
                    down: {
                      x: 0,
                      y: 0,
                      checked: false,
                    },
                    selected: false,
                  }));

                  if (extremeValues.selected) {
                    fillCells(col);
                  }
                }}
                style={{
                  border: '1px solid #000',
                  width: '40px',
                  height: '40px',
                  backgroundColor: col.checked ? 'red' : '#FFF',
                  userSelect: 'none',
                }}
              />
            ))}
          </tr>
        ))}
      </table>
    </div>
  );
}

export default App;
