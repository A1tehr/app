import React, { useState, useEffect } from 'react';
import { Label } from './ui/label';
import { Input } from './ui/input';

const MathCaptcha = ({ value, onChange, error }) => {
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [operator, setOperator] = useState('+');

  useEffect(() => {
    generateCaptcha();
  }, []);

  const generateCaptcha = () => {
    const n1 = Math.floor(Math.random() * 10) + 1;
    const n2 = Math.floor(Math.random() * 10) + 1;
    const ops = ['+', '-'];
    const op = ops[Math.floor(Math.random() * ops.length)];
    
    setNum1(n1);
    setNum2(n2);
    setOperator(op);
    onChange(''); // Reset captcha answer
  };

  const getCorrectAnswer = () => {
    if (operator === '+') return num1 + num2;
    if (operator === '-') return num1 - num2;
    return 0;
  };

  const isCorrect = () => {
    return parseInt(value) === getCorrectAnswer();
  };

  return (
    <div className="space-y-2">
      <Label>Решите пример (защита от спама) *</Label>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-md font-mono text-lg">
          <span>{num1}</span>
          <span>{operator}</span>
          <span>{num2}</span>
          <span>=</span>
        </div>
        <Input
          type="number"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="?"
          className={`w-20 ${error ? 'border-red-500' : ''}`}
          required
        />
        <button
          type="button"
          onClick={generateCaptcha}
          className="text-sm text-orange-600 hover:text-orange-700 underline"
        >
          Обновить
        </button>
      </div>
      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}
    </div>
  );
};

export default MathCaptcha;
