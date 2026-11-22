import React from 'react';
import StatCard from '../components/StatCard';
import ProgressBar from '../components/ProgressBar';

const Dashboard = ({
  progress,
  loading,
  onNavigateToProblems,
  onNavigateToTopics,
  onToggleStatus,
  onOpenAddModal
}) => {
  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-muted)' }}>
        Loading dashboard metrics...
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
    topicBreakdown = [],
    recentActivity = []
  } = progress || {};

  // Circumference for circular progress indicator
  const radius = 64;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset =
    circumference - (completionPercentage / 100) * circumference;

  return (
    <div>
      {/* 1. Main Stat Cards Grid */}
      <div className="stats-grid">
        <StatCard
          title="Total Questions"
          value={totalProblems}
          type="total"
          icon={(
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
            </svg>
          )}
        />
        <StatCard
          title="Solved Questions"
          value={solvedProblems}
          type="solved"
          subtitle={`${completionPercentage}% completed`}
          icon={(
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
          )}
        />
        <StatCard
          title="Unsolved Questions"
          value={unsolvedProblems}
          type="unsolved"
          icon={(
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          )}
        />
        <StatCard
          title="Easy Questions"
          value={`${difficultyBreakdown.easy.solved} / ${difficultyBreakdown.easy.total}`}
          type="easy"
          subtitle={`${difficultyBreakdown.easy.percentage}% solved`}
          icon={(
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <path d="M8 14s1.5 2 4 2 4-2 4-2" />
              <line x1="9" y1="9" x2="9.01" y2="9" />
              <line x1="15" y1="9" x2="15.01" y2="9" />
            </svg>
          )}
        />
        <StatCard
          title="Medium Questions"
          value={`${difficultyBreakdown.medium.solved} / ${difficultyBreakdown.medium.total}`}
          type="medium"
          subtitle={`${difficultyBreakdown.medium.percentage}% solved`}
          icon={(
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="8" y1="14" x2="16" y2="14" />
              <line x1="9" y1="9" x2="9.01" y2="9" />
              <line x1="15" y1="9" x2="15.01" y2="9" />
            </svg>
          )}
        />
        <StatCard
          title="Hard Questions"
          value={`${difficultyBreakdown.hard.solved} / ${difficultyBreakdown.hard.total}`}
          type="hard"
          subtitle={`${difficultyBreakdown.hard.percentage}% solved`}
          icon={(
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
          )}
        />
      </div>

      {/* 2. Visual Progress Breakdown Overview */}
      <div className="progress-overview-grid">
        {/* Overall Completion Circular Card */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Overall Completion</h3>
            <span className="badge badge-topic">All Topics</span>
          </div>

          <div className="completion-circle-container">
            <div className="circular-progress">
              <svg viewBox="0 0 160 160">
                <circle
                  className="circular-progress-bg"
                  cx="80"
                  cy="80"
                  r={radius}
                />
                <circle
                  className="circular-progress-bar"
                  cx="80"
                  cy="80"
                  r={radius}
                  style={{
                    strokeDasharray: circumference,
                    strokeDashoffset: isNaN(strokeDashoffset) ? circumference : strokeDashoffset
                  }}
                />
              </svg>
              <div className="circular-progress-value">
                <span className="percentage">{completionPercentage}%</span>
                <span className="label">Finished</span>
              </div>
            </div>

            <div style={{ marginTop: '18px', textAlign: 'center', fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
              You have completed <strong>{solvedProblems}</strong> out of <strong>{totalProblems}</strong> tracked problems.
            </div>
          </div>
        </div>

        {/* Difficulty Ratio Breakdown */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Difficulty Breakdown</h3>
            <button
              className="btn btn-secondary btn-sm"
              onClick={onNavigateToProblems}
            >
              View All
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '10px' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.88rem' }}>
                <span style={{ fontWeight: '600', color: 'var(--easy-color)' }}>Easy</span>
                <span style={{ color: 'var(--text-secondary)', fontWeight: '500' }}>
                  {difficultyBreakdown.easy.solved} / {difficultyBreakdown.easy.total} ({difficultyBreakdown.easy.percentage}%)
                </span>
              </div>
              <ProgressBar
                percentage={difficultyBreakdown.easy.percentage}
                variant="easy"
                height="10px"
              />
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.88rem' }}>
                <span style={{ fontWeight: '600', color: 'var(--medium-color)' }}>Medium</span>
                <span style={{ color: 'var(--text-secondary)', fontWeight: '500' }}>
                  {difficultyBreakdown.medium.solved} / {difficultyBreakdown.medium.total} ({difficultyBreakdown.medium.percentage}%)
                </span>
              </div>
              <ProgressBar
                percentage={difficultyBreakdown.medium.percentage}
                variant="medium"
                height="10px"
              />
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.88rem' }}>
                <span style={{ fontWeight: '600', color: 'var(--hard-color)' }}>Hard</span>
                <span style={{ color: 'var(--text-secondary)', fontWeight: '500' }}>
                  {difficultyBreakdown.hard.solved} / {difficultyBreakdown.hard.total} ({difficultyBreakdown.hard.percentage}%)
                </span>
              </div>
              <ProgressBar
                percentage={difficultyBreakdown.hard.percentage}
                variant="hard"
                height="10px"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 3. Recent Activity & Quick Topic Spotlight */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '24px' }}>
        {/* Recent Activity List */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Recent Activity</h3>
            <button
              className="btn btn-secondary btn-sm"
              onClick={onNavigateToProblems}
            >
              Full List
            </button>
          </div>

          {recentActivity.length === 0 ? (
            <div style={{ padding: '30px 10px', textAlign: 'center', color: 'var(--text-muted)' }}>
              No recent problem activity. Add or mark problems to see them here!
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {recentActivity.map((problem) => {
                const isSolved = problem.status === 'Solved';
                const diffClass = problem.difficulty.toLowerCase();
                return (
                  <div
                    key={problem._id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '12px 14px',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: '#f8fafc',
                      border: '1px solid var(--border-color)',
                      transition: 'background 0.2s'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div
                        className="status-toggle"
                        onClick={() => onToggleStatus(problem._id)}
                        title={`Click to mark ${isSolved ? 'Unsolved' : 'Solved'}`}
                      >
                        <div className={`status-checkbox ${isSolved ? 'checked' : ''}`}>
                          {isSolved && (
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                          )}
                        </div>
                      </div>

                      <div>
                        <div style={{ fontWeight: '600', fontSize: '0.92rem', color: 'var(--text-primary)' }}>
                          {problem.title}
                        </div>
                        <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                          {problem.topic}
                        </div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span className={`badge badge-${diffClass}`}>{problem.difficulty}</span>
                      {problem.problemLink && (
                        <a
                          href={problem.problemLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="problem-link-btn"
                          title="Open Link"
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                            <polyline points="15 3 21 3 21 9" />
                            <line x1="10" y1="14" x2="21" y2="3" />
                          </svg>
                        </a>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Quick Topic Highlights */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Top Topics</h3>
            <button
              className="btn btn-secondary btn-sm"
              onClick={onNavigateToTopics}
            >
              All 16 Topics
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {topicBreakdown.slice(0, 5).map((topicItem) => (
              <div key={topicItem.topic}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.86rem', marginBottom: '6px' }}>
                  <span style={{ fontWeight: '600', color: 'var(--text-primary)' }}>{topicItem.topic}</span>
                  <span style={{ color: 'var(--text-secondary)' }}>
                    {topicItem.solved} / {topicItem.total} ({topicItem.percentage}%)
                  </span>
                </div>
                <ProgressBar
                  percentage={topicItem.percentage}
                  variant="primary"
                  height="7px"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
