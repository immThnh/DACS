import * as React from 'react';
import styles from './priceRange.module.scss';

export default function PriceRange() {
  const [minValue, setMinValue] = React.useState(10000);
  const [maxValue, setMaxValue] = React.useState(500000);

  const handleMinChange = (event) => {
    const value = event.target.valueAsNumber;
    if (value <= maxValue) {
      setMinValue(value);
    }
  };

  const handleMaxChange = (event) => {
    const value = event.target.valueAsNumber;
    if (value >= minValue) {
      setMaxValue(value);
    }
  };

  return (
    <div className={styles.cardConteiner}>
      <div className={styles.cardContent}>
        <div className={styles.slider}>
          <input
            type="range"
            min="10000"
            max="1000000"
            value={minValue}
            className={styles.inputRange}
            onChange={handleMinChange}
          />
          <input
            type="range"
            min="10000"
            max="1000000"
            value={maxValue}
            className={styles.inputRange}
            onChange={handleMaxChange}
          />
          <div className={styles.track}></div>
        </div>
        <div className={styles.values}>
          <input
            type="text"
            value={minValue.toLocaleString()}
            className={styles.valueInput}
            readOnly
          />
          <span> - </span>
          <input
            type="text"
            value={maxValue.toLocaleString()}
            className={styles.valueInput}
            readOnly
          />
        </div>
      </div>
    </div>
  );
}
