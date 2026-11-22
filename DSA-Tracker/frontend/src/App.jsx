import React, { useState, useEffect, useCallback } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { problemService, progressService } from './services/api';

// Components
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import ProblemModal from './components/ProblemModal';
import DeleteConfirmModal from './components/DeleteConfirmModal';
import Toast from './components/Toast';

// Pages
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Problems from './pages/Problems';
import Topics from './pages/Topics';
import ProgressPage from './pages/ProgressPage';
import Profile from './pages/Profile';

const MainApp = () => {
  const { isAuthenticated, loading: authLoading } = useAuth();

  // Navigation State
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [authView, setAuthView] = useState('login'); // 'login' or 'register'
  const [mobileOpen, setMobileOpen] = useState(false);

  // Data States
  const [problems, setProblems] = useState([]);
  const [progress, setProgress] = useState(null);
  const [loadingProblems, setLoadingProblems] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(false);

  // Filters State
  const [search, setSearch] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedSort, setSelectedSort] = useState('newest');

  // Modals & Active Edit/Delete States
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [problemToEdit, setProblemToEdit] = useState(null);
  const [problemToDelete, setProblemToDelete] = useState(null);

  // Toast Notifications
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = 'info') => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Fetch Progress Stats
  const fetchProgress = useCallback(async () => {
    if (!isAuthenticated) return;
    try {
      setLoadingProgress(true);
      const data = await progressService.getProgress();
      if (data.success && data.stats) {
        setProgress(data.stats);
      }
    } catch (err) {
      console.error('Error fetching progress:', err);
    } finally {
      setLoadingProgress(false);
    }
  }, [isAuthenticated]);

  // Fetch Problems with Active Filters
  const fetchProblems = useCallback(async () => {
    if (!isAuthenticated) return;
    try {
      setLoadingProblems(true);
      const data = await problemService.getProblems({
        search,
        topic: selectedTopic,
        difficulty: selectedDifficulty,
        status: selectedStatus,
        sort: selectedSort
      });
      if (data.success && data.problems) {
        setProblems(data.problems);
      }
    } catch (err) {
      console.error('Error fetching problems:', err);
    } finally {
      setLoadingProblems(false);
    }
  }, [isAuthenticated, search, selectedTopic, selectedDifficulty, selectedStatus, selectedSort]);

  // Trigger loads when authenticated or filters change
  useEffect(() => {
    if (isAuthenticated) {
      fetchProgress();
      fetchProblems();
    }
  }, [isAuthenticated, fetchProgress, fetchProblems]);

  // Reset Filters
  const handleResetFilters = () => {
    setSearch('');
    setSelectedTopic('All');
    setSelectedDifficulty('All');
    setSelectedStatus('All');
    setSelectedSort('newest');
  };

  // Quick Status Toggle
  const handleToggleStatus = async (id) => {
    try {
      const data = await problemService.toggleProblemStatus(id);
      if (data.success && data.problem) {
        // Update problems list locally for instant UI response
        setProblems((prev) =>
          prev.map((p) => (p._id === id ? data.problem : p))
        );
        addToast(
          `Marked "${data.problem.title}" as ${data.problem.status}`,
          data.problem.status === 'Solved' ? 'success' : 'info'
        );
        fetchProgress();
      }
    } catch (err) {
      addToast(err.response?.data?.message || 'Failed to update problem status', 'error');
    }
  };

  // Save (Create or Update) Problem
  const handleSaveProblem = async (formData, idToUpdate) => {
    if (idToUpdate) {
      const data = await problemService.updateProblem(idToUpdate, formData);
      if (data.success) {
        addToast('Problem updated successfully', 'success');
        fetchProblems();
        fetchProgress();
      }
    } else {
      const data = await problemService.createProblem(formData);
      if (data.success) {
        addToast('New problem added to tracker', 'success');
        fetchProblems();
        fetchProgress();
      }
    }
  };

  // Open Edit Modal
  const handleOpenEditModal = (problem) => {
    setProblemToEdit(problem);
    setIsAddModalOpen(true);
  };

  // Delete Problem
  const handleConfirmDelete = async () => {
    if (!problemToDelete) return;
    try {
      const data = await problemService.deleteProblem(problemToDelete._id);
      if (data.success) {
        addToast('Problem deleted successfully', 'warning');
        setProblemToDelete(null);
        fetchProblems();
        fetchProgress();
      }
    } catch (err) {
      addToast(err.response?.data?.message || 'Failed to delete problem', 'error');
    }
  };

  // Seed Starter Problems
  const handleSeedProblems = async () => {
    try {
      const data = await problemService.seedStarterProblems();
      if (data.success) {
        addToast(`Added ${data.count} starter DSA problems!`, 'success');
        fetchProblems();
        fetchProgress();
      }
    } catch (err) {
      addToast(err.response?.data?.message || 'Failed to load starter problems', 'error');
    }
  };

  // Select Topic from Topics Page or Dashboard
  const handleSelectTopic = (topicName) => {
    setSelectedTopic(topicName);
    setCurrentPage('problems');
  };

  // If waiting for auth check
  if (authLoading) {
    return (
      <div
        style={{
          display: 'flex',
          height: '100vh',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'var(--bg-main)',
          color: 'var(--text-secondary)'
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '8px' }}>
            DSA Tracker
          </div>
          <div style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
            Loading your dashboard...
          </div>
        </div>
      </div>
    );
  }

  // If not authenticated, render Login or Register
  if (!isAuthenticated) {
    return (
      <>
        <Toast toasts={toasts} removeToast={removeToast} />
        {authView === 'login' ? (
          <Login onSwitchToRegister={() => setAuthView('register')} />
        ) : (
          <Register onSwitchToLogin={() => setAuthView('login')} />
        )}
      </>
    );
  }

  return (
    <div className="app-layout">
      {/* Toast Notification Container */}
      <Toast toasts={toasts} removeToast={removeToast} />

      {/* Dark Navy Sidebar */}
      <Sidebar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      {/* Main Content Area */}
      <div className="main-content-wrapper">
        <Navbar
          currentPage={currentPage}
          setMobileOpen={setMobileOpen}
          onOpenAddModal={() => {
            setProblemToEdit(null);
            setIsAddModalOpen(true);
          }}
          onRefreshData={() => {
            fetchProblems();
            fetchProgress();
            addToast('Repository refreshed', 'info');
          }}
        />

        <main className="page-container">
          {currentPage === 'dashboard' && (
            <Dashboard
              progress={progress}
              loading={loadingProgress}
              onNavigateToProblems={() => setCurrentPage('problems')}
              onNavigateToTopics={() => setCurrentPage('topics')}
              onToggleStatus={handleToggleStatus}
              onOpenAddModal={() => {
                setProblemToEdit(null);
                setIsAddModalOpen(true);
              }}
            />
          )}

          {currentPage === 'problems' && (
            <Problems
              problems={problems}
              loading={loadingProblems}
              search={search}
              setSearch={setSearch}
              selectedTopic={selectedTopic}
              setSelectedTopic={setSelectedTopic}
              selectedDifficulty={selectedDifficulty}
              setSelectedDifficulty={setSelectedDifficulty}
              selectedStatus={selectedStatus}
              setSelectedStatus={setSelectedStatus}
              selectedSort={selectedSort}
              setSelectedSort={setSelectedSort}
              onResetFilters={handleResetFilters}
              onToggleStatus={handleToggleStatus}
              onEditProblem={handleOpenEditModal}
              onDeleteProblem={(prob) => setProblemToDelete(prob)}
              onSeedProblems={handleSeedProblems}
              onOpenAddModal={() => {
                setProblemToEdit(null);
                setIsAddModalOpen(true);
              }}
            />
          )}

          {currentPage === 'topics' && (
            <Topics
              topicBreakdown={progress?.topicBreakdown || []}
              onSelectTopic={handleSelectTopic}
            />
          )}

          {currentPage === 'progress' && (
            <ProgressPage
              progress={progress}
              loading={loadingProgress}
              onSelectTopic={handleSelectTopic}
            />
          )}

          {currentPage === 'profile' && (
            <Profile onNotify={(msg, type) => addToast(msg, type)} />
          )}
        </main>
      </div>

      {/* Modal: Add or Edit Problem */}
      <ProblemModal
        isOpen={isAddModalOpen}
        onClose={() => {
          setIsAddModalOpen(false);
          setProblemToEdit(null);
        }}
        onSave={handleSaveProblem}
        problemToEdit={problemToEdit}
      />

      {/* Modal: Confirm Delete */}
      <DeleteConfirmModal
        isOpen={!!problemToDelete}
        onClose={() => setProblemToDelete(null)}
        onConfirm={handleConfirmDelete}
        problemTitle={problemToDelete?.title || ''}
      />
    </div>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
};

export default App;
