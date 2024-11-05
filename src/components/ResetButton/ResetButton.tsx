import React from 'react';
import styles from './ResetButton.module.css';
import Button from '@mui/material/Button';

interface ResetButtonProps {
    onClick: () => void;
}
const ResetButton: React.FC<ResetButtonProps> = ({ onClick }) => {
    return (
        <Button
            variant="contained"
            color="secondary"
            size="large"
            style={{ margin: '20px', padding: '10px 20px', fontSize: '1.25rem' }}
            onClick={onClick}
        >
            Restart
        </Button>
    );
};

export default ResetButton;
