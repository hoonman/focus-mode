import React from 'react';
import type { BlockedUrlListProps } from '../types';
import './BlockedUrlList.css';

export const BlockedUrlList: React.FC<BlockedUrlListProps> = ({ urls, onRemove }) => {
  if (urls.length === 0) {
    return (
      <div className="blocked-url-list empty">
        <p className="empty-message">No blocked URLs yet</p>
        <p className="empty-hint">Add URLs below to block them when focus mode is on</p>
      </div>
    );
  }

  return (
    <div className="blocked-url-list">
      <h3 className="list-title">Blocked URLs ({urls.length})</h3>
      <ul className="url-items">
        {urls.map((url, index) => (
          <li key={index} className="url-item">
            <span className="url-text" title={url}>{url}</span>
            <button
              className="remove-btn"
              onClick={() => onRemove(url)}
              aria-label={`Remove ${url}`}
            >
              ×
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};