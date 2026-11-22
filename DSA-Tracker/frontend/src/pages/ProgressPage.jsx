import React from 'react';
import ProgressBar from '../components/ProgressBar';

const ProgressPage = ({ progress, loading, onSelectTopic }) => {
  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-muted)' }}>
        Loading progress analytics...
      </div>
    );
  }

  const {
    totalProblems = 0,
    solvedProblems = 0,
    unsolvedProblems = 0,
    completionPercentage = 0,
    difficultyBreakdown = {
      easy: { total: 0, solved: 0, percentage: 0 },
      medium: { total: 0, solved: 0, percentage: 0 },
      hard: { total: 0, solved: 0, percentage: 0 }
    },
    topicBreakdown = []
  } = progress || {};

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '26px' }}>
      {/* 1. Global Overview Card */}
      <div className="card">
        <div className="card-header">
          <div>
            <h3 className="card-title">Overall Milestone Completion</h3>
            <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
              Summary of all solved problems across your repository
            </p>
          </div>
          <span style={{ fontSize: '1.6rem', fontWeight: '800', color: 'var(--primary)' }}>
            {completionPercentage}%
          </span>
        </div>

        <ProgressBar
          percentage={completionPercentage}
          variant="primary"
          height="14px"
        />

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '16px',
            marginTop: '22px',
            paddingTop: '18px',
            borderTop: '1px solid var(--border-color)'
          }}
        >
          <div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '600' }}>
              Total Questions
            </div>
            <div style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--text-primary)', marginTop: '2px' }}>
              {totalProblems}
            </div>
          </div>
          <div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '600' }}>
              Completed / Solved
            </div>
            <div style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--solved-color)', marginTop: '2px' }}>
              {solvedProblems}
            </div>
          </div>
          <div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '600' }}>
              Remaining
            </div>
            <div style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--unsolved-color)', marginTop: '2px' }}>
              {unsolvedProblems}
            </div>
          </div>
        </div>
      </div>

      {/* 2. Difficulty Distribution Analytics */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Difficulty Breakdown</h3>
          <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
            Practice across all complexity tiers
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
          {/* Easy Card */}
          <div
            style={{
              padding: '16px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--easy-border)',
              backgroundColor: 'var(--easy-bg)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontWeight: '700', color: 'var(--easy-color)' }}>Easy Problems</span>
              <span className="badge badge-easy">{difficultyBreakdown.easy.percentage}%</span>
            </div>
            <div style={{ fontSize: '1.3rem', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '8px' }}>
              {difficultyBreakdown.easy.solved} <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontWeight: '500' }}>/ {difficultyBreakdown.easy.total} Solved</span>
            </div>
            <ProgressBar
              percentage={difficultyBreakdown.easy.percentage}
              variant="easy"
              height="8px"
            />
          </div>

          {/* Medium Card */}
          <div
            style={{
              padding: '16px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--medium-border)',
              backgroundColor: 'var(--medium-bg)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontWeight: '700', color: 'var(--medium-color)' }}>Medium Problems</span>
              <span className="badge badge-medium">{difficultyBreakdown.medium.percentage}%</span>
            </div>
            <div style={{ fontSize: '1.3rem', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '8px' }}>
              {difficultyBreakdown.medium.solved} <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontWeight: '500' }}>/ {difficultyBreakdown.medium.total} Solved</span>
            </div>
            <ProgressBar
              percentage={difficultyBreakdown.medium.percentage}
              variant="medium"
              height="8px"
            />
          </div>

          {/* Hard Card */}
          <div
            style={{
              padding: '16px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--hard-border)',
              backgroundColor: 'var(--hard-bg)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontWeight: '700', color: 'var(--hard-color)' }}>Hard Problems</span>
              <span className="badge badge-hard">{difficultyBreakdown.hard.percentage}%</span>
            </div>
            <div style={{ fontSize: '1.3rem', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '8px' }}>
              {difficultyBreakdown.hard.solved} <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontWeight: '500' }}>/ {difficultyBreakdown.hard.total} Solved</span>
            </div>
            <ProgressBar
              percentage={difficultyBreakdown.hard.percentage}
              variant="hard"
              height="8px"
            />
          </div>
        </div>
      </div>

      {/* 3. Comprehensive Topic-Wise Progress Table */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Topic-Wise Mastery (All 16 Topics)</h3>
          <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
            Track your strengths and identify topics needing practice
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '10px' }}>
          {topicBreakdown.map((topicItem) => (
            <div
              key={topicItem.topic}
              style={{
                padding: '12px 16px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: '#f8fafc',
                border: '1px solid var(--border-color)',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onClick={() => onSelectTopic && onSelectTopic(topicItem.topic)}
              title="Click to view topic problems"
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontWeight: '600', fontSize: '0.94rem', color: 'var(--text-primary)' }}>
                    {topicItem.topic}
                  </span>
                  <span className="badge badge-topic">
                    {topicItem.solved} / {topicItem.total}
                  </span>
                </div>
                <span style={{ fontWeight: '700', fontSize: '0.88rem', color: 'var(--primary)' }}>
                  {topicItem.percentage}%
                </span>
              </div>
              <ProgressBar
                percentage={topicItem.percentage}
                variant="primary"
                height="8px"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProgressPage;
