import React from 'react';
import styles from './ResetButton.module.css';

interface ResetButtonProps {
    onClick: () => void;
}

const ResetButton: React.FC<ResetButtonProps> = ({ onClick }) => {
    return (
        <button className={styles.resetButton} onClick={onClick}>
            Сбросить игру
        </button>
    );
};

export default ResetButton;
