import React from 'react';

interface TranslationNoticeProps {
  language: string;
}

const TranslationNotice: React.FC<TranslationNoticeProps> = ({ language }) => {
  if (language === 'en') return null;

  return (
    <div style={{
      background: 'rgba(255, 193, 7, 0.15)',
      border: '2px solid rgba(255, 193, 7, 0.5)',
      borderRadius: '12px',
      padding: '12px 16px',
      marginBottom: '16px',
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    }}>
      <span style={{ fontSize: '16px' }}>ℹ️</span>
      <p style={{
        fontSize: '13px',
        color: '#333',
        fontWeight: '600',
        margin: 0,
        lineHeight: '1.4'
      }}>
        Translation coming soon. Showing English content.
      </p>
    </div>
  );
};

export default TranslationNotice;
