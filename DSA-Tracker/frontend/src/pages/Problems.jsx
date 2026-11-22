import React from 'react';
import FilterBar from '../components/FilterBar';
import ProblemTable from '../components/ProblemTable';

const Problems = ({
  problems,
  loading,
  search,
  setSearch,
  selectedTopic,
  setSelectedTopic,
  selectedDifficulty,
  setSelectedDifficulty,
  selectedStatus,
  setSelectedStatus,
  selectedSort,
  setSelectedSort,
  onResetFilters,
  onToggleStatus,
  onEditProblem,
  onDeleteProblem,
  onSeedProblems,
  onOpenAddModal
}) => {
  return (
    <div>
      {/* Search and Filters Toolbar */}
      <FilterBar
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
        onResetFilters={onResetFilters}
      />

      {/* Main Problems Table */}
      <ProblemTable
        problems={problems}
        loading={loading}
        onToggleStatus={onToggleStatus}
        onEditProblem={onEditProblem}
        onDeleteProblem={onDeleteProblem}
        onSeedProblems={onSeedProblems}
        onOpenAddModal={onOpenAddModal}
      />
    </div>
  );
};

export default Problems;
