import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const StorageCalculator = () => {
  const [storagePerItem, setStoragePerItem] = useState('');
  const [unit, setUnit] = useState('MB');
  const [itemsPerDay, setItemsPerDay] = useState('');
  const [daysPerYear, setDaysPerYear] = useState(365);
  const [yearsToStore, setYearsToStore] = useState('');
  const [results, setResults] = useState(null);
  const [errors, setErrors] = useState({});

  const unitsInBytes = {
    KB: 1 / 1024,
    MB: 1,
    GB: 1024,
    TB: 1024 * 1024,
  };

  const formatNumber = (num) => {
    if (typeof num!== 'number' || isNaN(num)) {
      console.error('Invalid input for formatNumber:', num);
      return 'N/A';
    }

    let formattedNum;
    let unit;

    if (num < 1000) {
      formattedNum = num.toFixed(2);
      unit = 'MB';
    } else if (num < 1000000) {
      formattedNum = (num / 1000).toFixed(2);
      unit = 'GB';
    } else {
      formattedNum = (num / 1000000).toFixed(2);
      unit = 'TB';
    }

    return `${formattedNum} ${unit}`;
  };

  const validateInputs = () => {
    const newErrors = {};
    const storageItem = parseFloat(storagePerItem);
    const itemsDay = parseFloat(itemsPerDay);
    const daysYear = parseFloat(daysPerYear);
    const yearsStore = parseFloat(yearsToStore);

    if (isNaN(storageItem) || storageItem < 0) {
      newErrors.storagePerItem = 'Storage per item must be a positive number.';
    }
    if (isNaN(itemsDay) || itemsDay < 0) {
      newErrors.itemsPerDay = 'Items per day must be a positive number.';
    }
    if (isNaN(daysYear) || daysYear <= 0 || daysYear % 1!== 0) {
      newErrors.daysPerYear = 'Days per year must be a positive integer.';
    }
    if (yearsToStore!== '' && (isNaN(yearsStore) || yearsStore < 0)) {
      newErrors.yearsToStore = 'Years to store must be a positive number or empty.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculateStorage = () => {
    const storagePerItemInBytes = parseFloat(storagePerItem) * unitsInBytes[unit];
    const dailyStorage = storagePerItemInBytes * parseFloat(itemsPerDay);

    const days = parseFloat(daysPerYear) || 365;
    let totalStorage = dailyStorage * days;

    if (yearsToStore!== '') {
      totalStorage *= parseFloat(yearsToStore);
    }

    return {
      perDay: formatNumber(dailyStorage),
      perMonth: formatNumber(dailyStorage * 30),
      perYear: formatNumber(totalStorage),
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateInputs()) {
      const results = calculateStorage();
      setResults(results);
      setErrors({});
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Storage Calculator</h2>
      <form onSubmit={handleSubmit} className="bg-light p-4 rounded shadow">
        <div className="form-group">
          <label htmlFor="storagePerItem" className="sr-only">Storage per Item:</label>
          <input
            type="number"
            inputMode="numeric"
            id="storagePerItem"
            className={`form-control ${errors.storagePerItem? 'is-invalid' : ''}`}
            value={storagePerItem}
            onChange={(e) => setStoragePerItem(e.target.value)}
            required
          />
          {errors.storagePerItem && <div className="invalid-feedback">{errors.storagePerItem}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="unit" className="sr-only">Unit:</label>
          <select
            id="unit"
            className="form-control"
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
          >
            <option value="KB">KB</option>
            <option value="MB">MB</option>
            <option value="GB">GB</option>
            <option value="TB">TB</option>
          </select>
          {errors.unit && <div className="invalid-feedback">{errors.unit}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="itemsPerDay" className="sr-only">Items per Day:</label>
          <input
            type="number"
            inputMode="numeric"
            id="itemsPerDay"
            className={`form-control ${errors.itemsPerDay? 'is-invalid' : ''}`}
            value={itemsPerDay}
            onChange={(e) => setItemsPerDay(e.target.value)}
            required
          />
          {errors.itemsPerDay && <div className="invalid-feedback">{errors.itemsPerDay}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="daysPerYear" className="sr-only">Days per Year:</label>
          <input
            type="number"
            inputMode="numeric"
            id="daysPerYear"
            className={`form-control ${errors.daysPerYear? 'is-invalid' : ''}`}
            value={daysPerYear}
            onChange={(e) => setDaysPerYear(e.target.value)}
          />
          {errors.daysPerYear && <div className="invalid-feedback">{errors.daysPerYear}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="yearsToStore" className="sr-only">Years to Store (Optional):</label>
          <input
            type="number"
            inputMode="numeric"
            id="yearsToStore"
            className={`form-control ${errors.yearsToStore? 'is-invalid' : ''}`}
            value={yearsToStore}
            onChange={(e) => setYearsToStore(e.target.value)}
            placeholder="Optional"
          />
          {errors.yearsToStore && <div className="invalid-feedback">{errors.yearsToStore}</div>}
        </div>

        <button type="submit" className="btn btn-primary btn-block">Calculate</button>
      </form>
      {results && (
        <div className="results mt-4 bg-light p-3 rounded shadow">
          <h4 className="mb-3">Estimated Storage:</h4>
          <p>{results.perDay} per day</p>
          <p>{results.perMonth} per month</p>
          <p>{results.perYear} per year</p>
        </div>
      )}
    </div>
  );
};

export default StorageCalculator;