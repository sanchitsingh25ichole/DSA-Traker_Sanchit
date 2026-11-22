import React from 'react';
import { useAuth } from '../context/AuthContext';

const Navbar = ({
  currentPage,
  setMobileOpen,
  onOpenAddModal,
  onRefreshData
}) => {
  const { user } = useAuth();

  const getPageTitle = (page) => {
    switch (page) {
      case 'dashboard':
        return { title: 'Dashboard', subtitle: 'Overview of your DSA preparation journey' };
      case 'problems':
        return { title: 'Problem Repository', subtitle: 'Manage, solve, and track your coding questions' };
      case 'topics':
        return { title: 'DSA Topics', subtitle: 'Comprehensive breakdown by algorithm categories' };
      case 'progress':
        return { title: 'Progress & Analytics', subtitle: 'Visual metrics, completion rates, and learning milestones' };
      case 'profile':
        return { title: 'Student Profile', subtitle: 'Account settings and personal statistics' };
      default:
        return { title: 'DSA Tracker', subtitle: 'Master Data Structures & Algorithms' };
    }
  };

  const { title, subtitle } = getPageTitle(currentPage);

  return (
    <header className="header-navbar">
      <div className="header-left">
        <button
          className="menu-toggle-btn"
          onClick={() => setMobileOpen(true)}
          aria-label="Toggle navigation menu"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>

        <div className="header-title-container">
          <h1>{title}</h1>
          <span className="header-subtitle">{subtitle}</span>
        </div>
      </div>

      <div className="header-right">
        {onRefreshData && (
          <button
            className="btn btn-secondary btn-icon"
            onClick={onRefreshData}
            title="Refresh Data"
            aria-label="Refresh Data"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="23 4 23 10 17 10" />
              <polyline points="1 20 1 14 7 14" />
              <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
            </svg>
          </button>
        )}

        <button
          className="btn btn-primary"
          onClick={onOpenAddModal}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          <span>Add Problem</span>
        </button>
      </div>
    </header>
  );
};

export default Navbar;
