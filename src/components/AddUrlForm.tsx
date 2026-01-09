import React, { useState } from 'react';
import type { AddUrlFormProps } from '../types';
import './AddUrlForm.css';

export const AddUrlForm: React.FC<AddUrlFormProps> = ({ onAdd }) => {
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');

  const validateUrl = (input: string): boolean => {
    // Basic URL validation - can be enhanced
    if (!input.trim()) {
      setError('URL cannot be empty');
      return false;
    }

    // Check for basic domain pattern (e.g., example.com, www.example.com)
    const domainPattern = /^([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/.*)?$/;
    const urlPattern = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/.*)?$/;
    
    if (!domainPattern.test(input) && !urlPattern.test(input)) {
      setError('Please enter a valid URL or domain');
      return false;
    }

    setError('');
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateUrl(url)) {
      // Normalize URL - remove protocol if present for consistency
      const normalizedUrl = url.replace(/^https?:\/\//, '');
      onAdd(normalizedUrl);
      setUrl('');
      setError('');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
    if (error) setError(''); // Clear error on input change
  };

  return (
    <form className="add-url-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="url-input" className="form-label">
          Add URL to block
        </label>
        <div className="input-wrapper">
          <input
            id="url-input"
            type="text"
            className={`url-input ${error ? 'error' : ''}`}
            value={url}
            onChange={handleInputChange}
            placeholder="example.com or www.youtube.com"
            aria-invalid={!!error}
            aria-describedby={error ? 'url-error' : undefined}
          />
          <button 
            type="submit" 
            className="add-btn"
            disabled={!url.trim()}
          >
            Add
          </button>
        </div>
        {error && (
          <p id="url-error" className="error-message" role="alert">
            {error}
          </p>
        )}
      </div>
    </form>
  );
};