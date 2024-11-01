import React from 'react';
import Board from '../Board/Board';
import styles from './App.module.css';

const App: React.FC = () => {
  return (
    <div className={styles.app}>
      <Board />
    </div>
  );
};

export default App;
