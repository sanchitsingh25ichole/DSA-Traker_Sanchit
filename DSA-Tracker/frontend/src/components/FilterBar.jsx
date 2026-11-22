import React from 'react';

export const TOPICS = [
  'Arrays',
  'Strings',
  'Linked Lists',
  'Stack',
  'Queue',
  'Binary Search',
  'Sorting',
  'Recursion',
  'Trees',
  'Binary Search Trees',
  'Graphs',
  'Dynamic Programming',
  'Greedy Algorithms',
  'Backtracking',
  'Bit Manipulation',
  'Heap'
];

const FilterBar = ({
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
  onResetFilters
}) => {
  const isFiltered =
    search !== '' ||
    selectedTopic !== 'All' ||
    selectedDifficulty !== 'All' ||
    selectedStatus !== 'All' ||
    selectedSort !== 'newest';

  return (
    <div className="filter-toolbar">
      {/* Search Input */}
      <div className="search-input-group">
        <svg
          className="search-icon"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          type="text"
          placeholder="Search problems by title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Filter Dropdowns */}
      <div className="filters-group">
        {/* Topic Filter */}
        <select
          className="custom-select"
          value={selectedTopic}
          onChange={(e) => setSelectedTopic(e.target.value)}
        >
          <option value="All">All Topics</option>
          {TOPICS.map((topic) => (
            <option key={topic} value={topic}>
              {topic}
            </option>
          ))}
        </select>

        {/* Difficulty Filter */}
        <select
          className="custom-select"
          value={selectedDifficulty}
          onChange={(e) => setSelectedDifficulty(e.target.value)}
        >
          <option value="All">All Difficulties</option>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>

        {/* Status Filter */}
        <select
          className="custom-select"
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
        >
          <option value="All">All Statuses</option>
          <option value="Solved">Solved</option>
          <option value="Unsolved">Unsolved</option>
        </select>

        {/* Sorting Dropdown */}
        <select
          className="custom-select"
          value={selectedSort}
          onChange={(e) => setSelectedSort(e.target.value)}
        >
          <option value="newest">Sort: Newest First</option>
          <option value="oldest">Sort: Oldest First</option>
          <option value="title-asc">Sort: Title (A-Z)</option>
          <option value="title-desc">Sort: Title (Z-A)</option>
          <option value="difficulty">Sort: Difficulty</option>
        </select>

        {/* Reset Button */}
        {isFiltered && (
          <button
            className="btn btn-secondary btn-sm"
            onClick={onResetFilters}
            title="Reset all filters"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
            <span>Reset</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default FilterBar;
