import React from 'react';
import ProgressBar from '../components/ProgressBar';

const topicIcons = {
  Arrays: '📦',
  Strings: '🔤',
  'Linked Lists': '🔗',
  Stack: '📚',
  Queue: '🚶',
  'Binary Search': '🔍',
  Sorting: '📶',
  Recursion: '🔄',
  Trees: '🌳',
  'Binary Search Trees': '🌲',
  Graphs: '🕸️',
  'Dynamic Programming': '⚡',
  'Greedy Algorithms': '🎯',
  Backtracking: '↩️',
  'Bit Manipulation': '💻',
  Heap: '🏔️'
};

const Topics = ({ topicBreakdown = [], onSelectTopic }) => {
  return (
    <div>
      <div style={{ marginBottom: '22px' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--text-primary)' }}>
          DSA Topic Mastery
        </h2>
        <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
          Select any topic below to view and practice its corresponding problems.
        </p>
      </div>

      <div className="topics-grid">
        {topicBreakdown.map((item) => {
          const icon = topicIcons[item.topic] || '💡';

          return (
            <div
              key={item.topic}
              className="topic-card"
              onClick={() => onSelectTopic(item.topic)}
            >
              <div className="topic-card-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontSize: '1.4rem' }}>{icon}</span>
                  <span className="topic-card-title">{item.topic}</span>
                </div>
                <span className="badge badge-topic">{item.percentage}%</span>
              </div>

              <div className="topic-card-meta">
                <span>
                  <strong>{item.solved}</strong> solved / <strong>{item.total}</strong> total
                </span>
                <span>{item.unsolved} remaining</span>
              </div>

              <ProgressBar
                percentage={item.percentage}
                variant="primary"
                height="8px"
              />

              <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'flex-end' }}>
                <span style={{ fontSize: '0.82rem', fontWeight: '600', color: 'var(--primary)' }}>
                  View Problems →
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Topics;
