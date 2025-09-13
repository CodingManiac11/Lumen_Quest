"use client";

import React from 'react';
import { cn } from '@/lib/design-system';
import { Input } from './Input';
import { Button } from './Button';

// Form validation hook
export const useForm = (initialValues = {}, validationRules = {}) => {
  const [values, setValues] = React.useState(initialValues);
  const [errors, setErrors] = React.useState({});
  const [touched, setTouched] = React.useState({});

  const validate = (fieldName, value) => {
    const rules = validationRules[fieldName];
    if (!rules) return '';

    for (const rule of rules) {
      const error = rule(value, values);
      if (error) return error;
    }
    return '';
  };

  const handleChange = (name, value) => {
    setValues(prev => ({ ...prev, [name]: value }));
    
    if (touched[name]) {
      const error = validate(name, value);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (name) => {
    setTouched(prev => ({ ...prev, [name]: true }));
    const error = validate(name, values[name]);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const validateAll = () => {
    const newErrors = {};
    let isValid = true;

    Object.keys(validationRules).forEach(fieldName => {
      const error = validate(fieldName, values[fieldName]);
      newErrors[fieldName] = error;
      if (error) isValid = false;
    });

    setErrors(newErrors);
    setTouched(Object.keys(validationRules).reduce((acc, key) => ({ ...acc, [key]: true }), {}));
    
    return isValid;
  };

  const reset = () => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  };

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    validateAll,
    reset,
    isValid: Object.values(errors).every(error => !error)
  };
};

// Validation rules
export const validationRules = {
  required: (value) => !value ? 'This field is required' : '',
  email: (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return value && !emailRegex.test(value) ? 'Please enter a valid email' : '';
  },
  minLength: (min) => (value) => {
    return value && value.length < min ? `Must be at least ${min} characters` : '';
  },
  maxLength: (max) => (value) => {
    return value && value.length > max ? `Must be no more than ${max} characters` : '';
  },
  match: (fieldName, message = 'Fields must match') => (value, allValues) => {
    return value !== allValues[fieldName] ? message : '';
  },
  numeric: (value) => {
    return value && isNaN(value) ? 'Must be a number' : '';
  },
  positiveNumber: (value) => {
    return value && (isNaN(value) || Number(value) <= 0) ? 'Must be a positive number' : '';
  }
};

// FormField component
const FormField = ({
  name,
  label,
  type = 'text',
  placeholder,
  value,
  error,
  touched,
  onChange,
  onBlur,
  className,
  ...props
}) => {
  return (
    <div className={cn('space-y-1', className)}>
      {label && (
        <label htmlFor={name} className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <Input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value || ''}
        error={touched && error}
        onChange={(e) => onChange(name, e.target.value)}
        onBlur={() => onBlur(name)}
        fullWidth
        {...props}
      />
    </div>
  );
};

// Form component
const Form = ({
  children,
  onSubmit,
  className,
  ...props
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(e);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cn('space-y-4', className)}
      {...props}
    >
      {children}
    </form>
  );
};

// Select component
const Select = React.forwardRef(({
  children,
  className,
  label,
  error,
  fullWidth = false,
  ...props
}, ref) => {
  const selectId = props.id || `select-${Math.random().toString(36).substr(2, 9)}`;
  
  return (
    <div className={cn('space-y-1', fullWidth && 'w-full')}>
      {label && (
        <label htmlFor={selectId} className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <select
        ref={ref}
        id={selectId}
        className={cn(
          'block border border-gray-300 rounded-lg bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed',
          error && 'border-red-500 focus:ring-red-500',
          fullWidth && 'w-full',
          className
        )}
        {...props}
      >
        {children}
      </select>
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
    </div>
  );
});

Select.displayName = 'Select';

// Textarea component
const Textarea = React.forwardRef(({
  className,
  label,
  error,
  fullWidth = false,
  rows = 3,
  ...props
}, ref) => {
  const textareaId = props.id || `textarea-${Math.random().toString(36).substr(2, 9)}`;
  
  return (
    <div className={cn('space-y-1', fullWidth && 'w-full')}>
      {label && (
        <label htmlFor={textareaId} className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <textarea
        ref={ref}
        id={textareaId}
        rows={rows}
        className={cn(
          'block w-full border border-gray-300 rounded-lg bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed resize-vertical',
          error && 'border-red-500 focus:ring-red-500',
          className
        )}
        {...props}
      />
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
    </div>
  );
});

Textarea.displayName = 'Textarea';

export { 
  Form, 
  FormField, 
  Select, 
  Textarea
};