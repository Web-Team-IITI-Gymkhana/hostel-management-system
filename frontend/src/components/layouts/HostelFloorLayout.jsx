import React from 'react';
import PropTypes from 'prop-types';

export default function HostelFloorLayout({ hoveredUnit, setHoveredUnit }) {

  // const [hoveredUnit, setHoveredUnit] = useState(null);

  const gridLayout = [
    [0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0],
    [0, 1, 1, 1, 2, 2, 2, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 2, 2, 2, 1, 1, 1, 0],
    [1, 1, 1, 1, 2, 2, 2, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 2, 2, 2, 1, 1, 1, 1],
    [1, 1, 1, 1, 2, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 2, 1, 1, 1, 1],
    [0, 1, 1, 1, 2, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 2, 1, 1, 1, 0],
    [0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0],
    [0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 2, 0, 0, 0, 0],
    [0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 0, 0, 0, 0],
    [0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 0, 0, 0, 0],
    [0, 1, 1, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 2, 1, 1, 1, 0],
    [1, 1, 1, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 1, 1, 1, 1],
    [1, 1, 1, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 1, 1, 1, 1],
    [0, 1, 1, 1, 2, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 1, 1, 1, 0],
    [0, 0, 0, 0, 2, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0],
    [0, 0, 0, 0, 2, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0],
    [0, 0, 0, 0, 2, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0],
    [0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0],
    [0, 1, 1, 1, 2, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 2, 1, 1, 1, 0],
    [1, 1, 1, 1, 2, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 2, 1, 1, 1, 1],
    [1, 1, 1, 1, 2, 2, 2, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 2, 2, 2, 1, 1, 1, 1],
    [0, 1, 1, 1, 2, 2, 2, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 2, 2, 2, 1, 1, 1, 0],
    [0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0],
  ];

  const units = [
    { label: '01', rowStart: 21, rowEnd: 25, colStart: 0, colEnd: 4 },
    { label: '02', rowStart: 16, rowEnd: 20, colStart: 5, colEnd: 9 },
    { label: '03', rowStart: 13, rowEnd: 17, colStart: 0, colEnd: 4 },
    { label: '04', rowStart: 5, rowEnd: 9, colStart: 0, colEnd: 4 },
    { label: '05', rowStart: 0, rowEnd: 4, colStart: 5, colEnd: 9 },
    { label: '06', rowStart: 5, rowEnd: 9, colStart: 9, colEnd: 13 },
    { label: '07', rowStart: 0, rowEnd: 4, colStart: 13, colEnd: 17 },
    { label: '08', rowStart: 5, rowEnd: 9, colStart: 17, colEnd: 21 },
    { label: '09', rowStart: 0, rowEnd: 4, colStart: 21, colEnd: 25 },
    { label: '10', rowStart: 5, rowEnd: 9, colStart: 26, colEnd: 30 },
    { label: '11', rowStart: 10, rowEnd: 14, colStart: 21, colEnd: 25 },
    { label: '12', rowStart: 13, rowEnd: 17, colStart: 26, colEnd: 30 },
    { label: '13', rowStart: 21, rowEnd: 25, colStart: 26, colEnd: 30 },
    { label: '14', rowStart: 26, rowEnd: 30, colStart: 21, colEnd: 25 },
    { label: '15', rowStart: 21, rowEnd: 25, colStart: 17, colEnd: 21 },
    { label: '16', rowStart: 26, rowEnd: 30, colStart: 13, colEnd: 17 },
    { label: '17', rowStart: 21, rowEnd: 25, colStart: 9, colEnd: 13 },
    { label: '18', rowStart: 26, rowEnd: 30, colStart: 5, colEnd: 9 },
  ];

  const handleClick = (unitLabel) => {
    setHoveredUnit(unitLabel);
  };


  return (
    <div className="flex flex-col items-center">
      <div className="w-[800px] h-[800px] grid grid-rows-30 grid-cols-30">
        {gridLayout.map((row, rowIndex) => (
          <div key={rowIndex} className="grid grid-flow-col">
            {row.map((cell, cellIndex) => {
              let cellClass = "col-span-1";


              let unitLabel = null;
              for (const unit of units) {
                if (
                  rowIndex >= unit.rowStart &&
                  rowIndex < unit.rowEnd &&
                  cellIndex >= unit.colStart &&
                  cellIndex < unit.colEnd
                ) {
                  cellClass += ` unit-${unit.label}`;
                  unitLabel = unit.label;
                  break;
                }
              }


              if (hoveredUnit === unitLabel && unitLabel && cell==1) {
                cellClass += " bg-green-600"; 
              }

              if (cell === 1) {
                cellClass += " bg-green-400";
              } else if (cell === 2) {
                cellClass += " bg-blue-300";
              }

              return (
                <div
                  key={cellIndex}
                  className={cellClass}
                  onClick={() => handleClick(unitLabel)}
                ></div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

HostelFloorLayout.propTypes = {
  hoveredUnit: PropTypes.string,
  setHoveredUnit: PropTypes.func.isRequired,
};