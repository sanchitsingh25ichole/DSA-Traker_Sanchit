import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { profileService } from '../services/api';
import ProgressBar from '../components/ProgressBar';

const Profile = ({ onNotify }) => {
  const { user, updateUser } = useAuth();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [updating, setUpdating] = useState(false);
  const [statusMessage, setStatusMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const data = await profileService.getProfile();
      if (data.success && data.profile) {
        setProfileData(data.profile);
        setName(data.profile.name);
      }
    } catch (err) {
      console.error('Failed to load profile:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setStatusMessage({ type: 'error', text: 'Name cannot be empty' });
      return;
    }

    if (password && password.length < 6) {
      setStatusMessage({ type: 'error', text: 'Password must be at least 6 characters' });
      return;
    }

    if (password && password !== confirmPassword) {
      setStatusMessage({ type: 'error', text: 'Passwords do not match' });
      return;
    }

    try {
      setUpdating(true);
      setStatusMessage({ type: '', text: '' });

      const payload = { name: name.trim() };
      if (password) payload.password = password;

      const data = await profileService.updateProfile(payload);
      if (data.success) {
        setStatusMessage({ type: 'success', text: 'Profile successfully updated!' });
        updateUser(data.user);
        setPassword('');
        setConfirmPassword('');
        if (onNotify) onNotify('Profile updated successfully!', 'success');
      }
    } catch (err) {
      setStatusMessage({
        type: 'error',
        text: err.response?.data?.message || err.message || 'Failed to update profile'
      });
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-muted)' }}>
        Loading student profile...
      </div>
    );
  }

  const { stats } = profileData || {};
  const formattedDate = profileData?.createdAt
    ? new Date(profileData.createdAt).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    : 'Recently';

  return (
    <div style={{ maxWidth: '960px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* 1. Profile Header Card */}
      <div className="card">
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
          <div
            style={{
              width: '74px',
              height: '74px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #2563eb, #7c3aed)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              fontSize: '2rem',
              fontWeight: '700',
              boxShadow: '0 8px 20px rgba(37, 99, 235, 0.3)'
            }}
          >
            {profileData?.name ? profileData.name.charAt(0).toUpperCase() : 'U'}
          </div>

          <div style={{ flex: 1, minWidth: '220px' }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--text-primary)' }}>
              {profileData?.name}
            </h2>
            <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
              {profileData?.email}
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '6px' }}>
              Member Since: {formattedDate}
            </div>
          </div>

          <div
            style={{
              padding: '12px 20px',
              backgroundColor: '#eff6ff',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid #bfdbfe',
              textAlign: 'center'
            }}
          >
            <div style={{ fontSize: '0.75rem', fontWeight: '700', color: '#1e40af', textTransform: 'uppercase' }}>
              Completion Rate
            </div>
            <div style={{ fontSize: '1.6rem', fontWeight: '800', color: '#1d4ed8', marginTop: '2px' }}>
              {stats?.completionPercentage || 0}%
            </div>
          </div>
        </div>
      </div>

      {/* 2. Solved Stats Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px'
        }}
      >
        <div className="card" style={{ padding: '16px 20px' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '600' }}>
            TOTAL SOLVED
          </div>
          <div style={{ fontSize: '1.6rem', fontWeight: '800', color: 'var(--solved-color)', marginTop: '4px' }}>
            {stats?.solvedProblems || 0} / {stats?.totalProblems || 0}
          </div>
          <div style={{ marginTop: '8px' }}>
            <ProgressBar percentage={stats?.completionPercentage || 0} variant="primary" height="6px" />
          </div>
        </div>

        <div className="card" style={{ padding: '16px 20px' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--easy-color)', fontWeight: '600' }}>
            EASY SOLVED
          </div>
          <div style={{ fontSize: '1.6rem', fontWeight: '800', color: 'var(--text-primary)', marginTop: '4px' }}>
            {stats?.easySolved || 0}
          </div>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '6px' }}>
            Foundation concepts
          </div>
        </div>

        <div className="card" style={{ padding: '16px 20px' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--medium-color)', fontWeight: '600' }}>
            MEDIUM SOLVED
          </div>
          <div style={{ fontSize: '1.6rem', fontWeight: '800', color: 'var(--text-primary)', marginTop: '4px' }}>
            {stats?.mediumSolved || 0}
          </div>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '6px' }}>
            Interview standard
          </div>
        </div>

        <div className="card" style={{ padding: '16px 20px' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--hard-color)', fontWeight: '600' }}>
            HARD SOLVED
          </div>
          <div style={{ fontSize: '1.6rem', fontWeight: '800', color: 'var(--text-primary)', marginTop: '4px' }}>
            {stats?.hardSolved || 0}
          </div>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '6px' }}>
            Advanced challenges
          </div>
        </div>
      </div>

      {/* 3. Account Settings & Profile Update Form */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Account Settings</h3>
          <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
            Update your profile name or change password
          </span>
        </div>

        {statusMessage.text && (
          <div
            style={{
              padding: '10px 14px',
              backgroundColor: statusMessage.type === 'success' ? 'var(--easy-bg)' : 'var(--hard-bg)',
              border: `1px solid ${statusMessage.type === 'success' ? 'var(--easy-border)' : 'var(--hard-border)'}`,
              color: statusMessage.type === 'success' ? 'var(--easy-color)' : 'var(--hard-color)',
              borderRadius: 'var(--radius-md)',
              marginBottom: '18px',
              fontSize: '0.88rem'
            }}
          >
            {statusMessage.text}
          </div>
        )}

        <form onSubmit={handleUpdate}>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              id="name"
              type="text"
              className="form-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address (Registered)</label>
            <input
              id="email"
              type="email"
              className="form-input"
              value={profileData?.email || ''}
              disabled
              style={{ backgroundColor: '#f1f5f9', cursor: 'not-allowed', color: '#64748b' }}
            />
            <span style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '4px', display: 'block' }}>
              Email address is tied to your account and cannot be modified.
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginTop: '16px' }}>
            <div className="form-group">
              <label htmlFor="password">New Password (leave blank to keep current)</label>
              <input
                id="password"
                type="password"
                className="form-input"
                placeholder="Min. 6 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm New Password</label>
              <input
                id="confirmPassword"
                type="password"
                className="form-input"
                placeholder="Repeat new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>

          <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'flex-end' }}>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={updating}
            >
              {updating ? 'Saving changes...' : 'Save Profile Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
