import React from 'react';

interface CellProps {
    value: 'X' | 'O' | null;
    onClick: () => void;
    isWinningCell?: boolean;
    className?: string;
}

const Cell: React.FC<CellProps> = ({
    value,
    onClick,
    isWinningCell = false,
    className = ''
}) => {
    return (
        <div
            className={`${className} ${isWinningCell ? 'winningCell' : ''}`}
            onClick={onClick}
        >
            {value}
        </div>
    );
};

export default Cell;
