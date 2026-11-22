import React, { useState } from 'react';

const ProblemTable = ({
  problems,
  loading,
  onToggleStatus,
  onEditProblem,
  onDeleteProblem,
  onSeedProblems,
  onOpenAddModal
}) => {
  const [selectedNotes, setSelectedNotes] = useState(null);

  if (loading) {
    return (
      <div className="table-container" style={{ padding: '60px 20px', textAlign: 'center' }}>
        <div style={{ color: 'var(--text-muted)', fontSize: '1rem', fontWeight: '500' }}>
          Loading problems...
        </div>
      </div>
    );
  }

  if (!problems || problems.length === 0) {
    return (
      <div className="table-container" style={{ padding: '60px 20px', textAlign: 'center' }}>
        <div style={{ maxWidth: '420px', margin: '0 auto' }}>
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              backgroundColor: '#f1f5f9',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px auto',
              color: '#94a3b8'
            }}
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          </div>
          <h3 style={{ fontSize: '1.15rem', fontWeight: '700', marginBottom: '8px', color: 'var(--text-primary)' }}>
            No Problems Found
          </h3>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '20px' }}>
            No questions matched your search criteria, or your repository is empty. Add your first problem or load standard starter questions.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
            <button className="btn btn-primary btn-sm" onClick={onOpenAddModal}>
              + Add Problem
            </button>
            {onSeedProblems && (
              <button className="btn btn-secondary btn-sm" onClick={onSeedProblems}>
                Load Starter Problems
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="table-container">
        <table className="custom-table">
          <thead>
            <tr>
              <th style={{ width: '45px', textAlign: 'center' }}>Status</th>
              <th>Problem Title</th>
              <th>Topic</th>
              <th>Difficulty</th>
              <th>Practice Link</th>
              <th>Notes</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {problems.map((problem) => {
              const isSolved = problem.status === 'Solved';
              const difficultyClass = problem.difficulty
                ? problem.difficulty.toLowerCase()
                : 'easy';

              return (
                <tr key={problem._id}>
                  {/* Status Toggle */}
                  <td style={{ textAlign: 'center' }}>
                    <div
                      className="status-toggle"
                      onClick={() => onToggleStatus(problem._id)}
                      title={`Click to mark as ${isSolved ? 'Unsolved' : 'Solved'}`}
                    >
                      <div className={`status-checkbox ${isSolved ? 'checked' : ''}`}>
                        {isSolved && (
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        )}
                      </div>
                    </div>
                  </td>

                  {/* Problem Title */}
                  <td>
                    <div style={{ fontWeight: '600', color: isSolved ? 'var(--text-secondary)' : 'var(--text-primary)' }}>
                      {problem.title}
                    </div>
                  </td>

                  {/* Topic Badge */}
                  <td>
                    <span className="badge badge-topic">{problem.topic}</span>
                  </td>

                  {/* Difficulty Badge */}
                  <td>
                    <span className={`badge badge-${difficultyClass}`}>
                      {problem.difficulty}
                    </span>
                  </td>

                  {/* Practice Link */}
                  <td>
                    {problem.problemLink ? (
                      <a
                        href={problem.problemLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="problem-link-btn"
                        title={problem.problemLink}
                      >
                        <span>Solve</span>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                          <polyline points="15 3 21 3 21 9" />
                          <line x1="10" y1="14" x2="21" y2="3" />
                        </svg>
                      </a>
                    ) : (
                      <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>None</span>
                    )}
                  </td>

                  {/* Notes Preview */}
                  <td>
                    {problem.notes ? (
                      <button
                        className="btn btn-secondary btn-sm"
                        style={{ padding: '3px 8px', fontSize: '0.78rem' }}
                        onClick={() => setSelectedNotes({ title: problem.title, notes: problem.notes })}
                        title="View Personal Notes"
                      >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                          <polyline points="14 2 14 8 20 8" />
                          <line x1="16" y1="13" x2="8" y2="13" />
                          <line x1="16" y1="17" x2="8" y2="17" />
                        </svg>
                        <span>View Notes</span>
                      </button>
                    ) : (
                      <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>—</span>
                    )}
                  </td>

                  {/* Actions */}
                  <td style={{ textAlign: 'right' }}>
                    <div className="action-buttons" style={{ justifyContent: 'flex-end' }}>
                      <button
                        className="action-btn"
                        onClick={() => onEditProblem(problem)}
                        title="Edit Problem"
                        aria-label="Edit Problem"
                      >
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                        </svg>
                      </button>
                      <button
                        className="action-btn delete"
                        onClick={() => onDeleteProblem(problem)}
                        title="Delete Problem"
                        aria-label="Delete Problem"
                      >
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="3 6 5 6 21 6" />
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                          <line x1="10" y1="11" x2="10" y2="17" />
                          <line x1="14" y1="11" x2="14" y2="17" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Quick Notes Modal */}
      {selectedNotes && (
        <div className="modal-backdrop" onClick={() => setSelectedNotes(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">Notes: {selectedNotes.title}</h3>
              <button
                onClick={() => setSelectedNotes(null)}
                style={{ fontSize: '1.2rem', color: 'var(--text-muted)', cursor: 'pointer' }}
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <div
                style={{
                  backgroundColor: '#f8fafc',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-md)',
                  padding: '16px',
                  whiteSpace: 'pre-wrap',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.88rem',
                  lineHeight: '1.6',
                  color: 'var(--text-primary)'
                }}
              >
                {selectedNotes.notes}
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary btn-sm" onClick={() => setSelectedNotes(null)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProblemTable;
