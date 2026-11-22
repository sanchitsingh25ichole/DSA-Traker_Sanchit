import React, { useState, useEffect } from 'react';
import { TOPICS } from './FilterBar';

const ProblemModal = ({ isOpen, onClose, onSave, problemToEdit }) => {
  const [formData, setFormData] = useState({
    title: '',
    topic: 'Arrays',
    difficulty: 'Easy',
    problemLink: '',
    status: 'Unsolved',
    notes: ''
  });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (problemToEdit) {
      setFormData({
        title: problemToEdit.title || '',
        topic: problemToEdit.topic || 'Arrays',
        difficulty: problemToEdit.difficulty || 'Easy',
        problemLink: problemToEdit.problemLink || '',
        status: problemToEdit.status || 'Unsolved',
        notes: problemToEdit.notes || ''
      });
    } else {
      setFormData({
        title: '',
        topic: 'Arrays',
        difficulty: 'Easy',
        problemLink: '',
        status: 'Unsolved',
        notes: ''
      });
    }
    setError('');
  }, [problemToEdit, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDifficultySelect = (difficulty) => {
    setFormData((prev) => ({ ...prev, difficulty }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      setError('Problem title is required');
      return;
    }

    try {
      setSubmitting(true);
      setError('');
      await onSave(formData, problemToEdit ? problemToEdit._id : null);
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Error saving problem');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3 className="modal-title">
            {problemToEdit ? 'Edit DSA Problem' : 'Add New Problem'}
          </h3>
          <button
            onClick={onClose}
            style={{ fontSize: '1.3rem', color: 'var(--text-muted)', cursor: 'pointer' }}
            aria-label="Close modal"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            {error && (
              <div
                style={{
                  padding: '10px 14px',
                  backgroundColor: 'var(--hard-bg)',
                  border: '1px solid var(--hard-border)',
                  color: 'var(--hard-color)',
                  borderRadius: 'var(--radius-md)',
                  marginBottom: '16px',
                  fontSize: '0.88rem'
                }}
              >
                {error}
              </div>
            )}

            {/* Title */}
            <div className="form-group">
              <label htmlFor="title">Problem Title *</label>
              <input
                id="title"
                name="title"
                type="text"
                className="form-input"
                placeholder="e.g. Two Sum, Valid Parentheses"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>

            {/* Topic & Status row */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div className="form-group">
                <label htmlFor="topic">DSA Topic *</label>
                <select
                  id="topic"
                  name="topic"
                  className="form-select"
                  value={formData.topic}
                  onChange={handleChange}
                >
                  {TOPICS.map((topic) => (
                    <option key={topic} value={topic}>
                      {topic}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="status">Initial Status</label>
                <select
                  id="status"
                  name="status"
                  className="form-select"
                  value={formData.status}
                  onChange={handleChange}
                >
                  <option value="Unsolved">Unsolved</option>
                  <option value="Solved">Solved</option>
                </select>
              </div>
            </div>

            {/* Difficulty Pills */}
            <div className="form-group">
              <label>Difficulty Level *</label>
              <div className="difficulty-radio-group">
                {['Easy', 'Medium', 'Hard'].map((diff) => {
                  const diffClass = diff.toLowerCase();
                  const isSelected = formData.difficulty === diff;
                  return (
                    <div
                      key={diff}
                      className={`difficulty-radio-label ${diffClass} ${isSelected ? 'selected' : ''}`}
                      onClick={() => handleDifficultySelect(diff)}
                    >
                      <span>{diff}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Practice Link */}
            <div className="form-group">
              <label htmlFor="problemLink">Problem URL / Practice Link</label>
              <input
                id="problemLink"
                name="problemLink"
                type="url"
                className="form-input"
                placeholder="https://leetcode.com/problems/..."
                value={formData.problemLink}
                onChange={handleChange}
              />
            </div>

            {/* Notes */}
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label htmlFor="notes">Personal Notes / Approach</label>
              <textarea
                id="notes"
                name="notes"
                className="form-textarea"
                placeholder="Write your key takeaways, time/space complexity, edge cases..."
                value={formData.notes}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
              disabled={submitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={submitting}
            >
              {submitting ? 'Saving...' : problemToEdit ? 'Update Problem' : 'Add Problem'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProblemModal;
