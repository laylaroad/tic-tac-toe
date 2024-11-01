import React from 'react';
import styles from './Cell.module.css';

interface CellProps {
    value: 'X' | 'O' | null;
    onClick: () => void;
}

const Cell: React.FC<CellProps> = ({ value, onClick }) => {
    return (
        <button className={styles.cell} onClick={onClick}>
            {value}
        </button>
    );
};

export default Cell;
