import React, { useState } from 'react';

const TrafficCalculator = () => {
  const [numRequests, setNumRequests] = useState('');
  const [timeRange, setTimeRange] = useState('per sec');
  const [results, setResults] = useState(null);
  const [errors, setErrors] = useState({});

  const timeUnitConversion = {
    'per sec': 1,
    'per min': 60,
    'per hour': 3600,
    'per day': 86400,
    'per month': 2592000,
    'per year': 31536000,
  };

  const formatNumber = (num) => {
    let formattedNum;
    let unit;

    if (num < 1000) {
      formattedNum = num.toFixed(2);
      unit = 'req';
    } else if (num < 1000000) {
      formattedNum = (num / 1000).toFixed(2);
      unit = 'K req';
    } else if (num < 1000000000) {
      formattedNum = (num / 1000000).toFixed(2);
      unit = 'M req';
    } else {
      formattedNum = (num / 1000000000).toFixed(2);
      unit = 'B req';
    }

    return `${formattedNum} ${unit}`;
  };

  const validateInputs = () => {
    const newErrors = {};

    if (parseFloat(numRequests) <= 0 || isNaN(numRequests)) {
      newErrors.numRequests = 'Number of requests must be a positive number.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculateTraffic = () => {
    const baseRequests = parseFloat(numRequests);
    const totalRequests = baseRequests * timeUnitConversion[timeRange];

    return {
      perSec: formatNumber(totalRequests),
      perMin: formatNumber(totalRequests * 60),
      perHour: formatNumber(totalRequests * 3600),
      perDay: formatNumber(totalRequests * 86400),
      perMonth: formatNumber(totalRequests * 2592000),
      perYear: formatNumber(totalRequests * 31536000),
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateInputs()) {
      const results = calculateTraffic();
      setResults(results);
      setErrors({});
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Traffic Calculator</h2>
      <form onSubmit={handleSubmit} className="bg-light p-4 rounded shadow">
        <div className="form-group">
          <label htmlFor="numRequests">Number of Requests:</label>
          <input
            type="number"
            id="numRequests"
            className="form-control"
            value={numRequests}
            onChange={(e) => setNumRequests(e.target.value)}
            required
          />
          {errors.numRequests && <small className="text-danger">{errors.numRequests}</small>}
        </div>
        <div className="form-group">
          <label htmlFor="timeRange">Time Range:</label>
          <select
            id="timeRange"
            className="form-control"
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
          >
            <option value="per sec">per sec</option>
            <option value="per min">per min</option>
            <option value="per hour">per hour</option>
            <option value="per day">per day</option>
            <option value="per month">per month</option>
            <option value="per year">per year</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary btn-block">Calculate</button>
      </form>
      {results && (
        <div className="results mt-4">
          <h4>Estimated Traffic:</h4>
          <p>{results.perSec} per second</p>
          <p>{results.perMin} per minute</p>
          <p>{results.perHour} per hour</p>
          <p>{results.perDay} per day</p>
          <p>{results.perMonth} per month</p>
          <p>{results.perYear} per year</p>
        </div>
      )}
    </div>
  );
};

export default TrafficCalculator;
