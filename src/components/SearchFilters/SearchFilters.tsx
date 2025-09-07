import React from 'react';
import { Search, Filter, X } from 'lucide-react';
import { PropertyFilters } from '@/types';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface SearchFiltersProps {
  filters: PropertyFilters;
  onFiltersChange: (filters: PropertyFilters) => void;
  showFilters: boolean;
  onToggleFilters: () => void;
}

export const SearchFilters: React.FC<SearchFiltersProps> = ({
  filters,
  onFiltersChange,
  showFilters,
  onToggleFilters
}) => {
  const handleFilterChange = (
    key: keyof PropertyFilters,
    value: string | number | undefined
  ) => {
    onFiltersChange({
      ...filters,
      [key]: value === '' ? undefined : value
    });
  };

  const clearFilters = () => {
    onFiltersChange({});
  };

  const hasActiveFilters = Object.values(filters).some(value => value !== undefined && value !== '');

  return (
    <section className="bg-white/90 backdrop-blur-sm rounded-xl shadow-xl border border-white/30" role="search" aria-label="Property search and filters">
      <div className="p-6">
        {/* Search Bar */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" aria-hidden="true" />
          <Input
            type="text"
            placeholder="Search by location, property type, or features..."
            value={filters.location || ''}
            onChange={(e) => handleFilterChange('location', e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            aria-label="Search properties by location, property type, or features"
          />
        </div>

        {/* Filter Toggle */}
        <div className="flex justify-between items-center">
          <button
            onClick={onToggleFilters}
            className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg"
            aria-expanded={showFilters}
            aria-controls="advanced-filters"
            aria-label={`${showFilters ? 'Hide' : 'Show'} advanced filters${hasActiveFilters ? ' (filters are currently active)' : ''}`}
          >
            <Filter className="w-4 h-4" aria-hidden="true" />
            <span>Filters</span>
            {hasActiveFilters && (
              <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full" aria-label="Active filters indicator">
                Active
              </span>
            )}
          </button>
          
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="flex items-center space-x-1 text-gray-500 hover:text-red-500 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 rounded-lg px-2 py-1"
              aria-label="Clear all active filters"
            >
              <X className="w-4 h-4" aria-hidden="true" />
              <span className="text-sm">Clear</span>
            </button>
          )}
        </div>
      </div>

      {/* Expanded Filters */}
      <div 
        id="advanced-filters"
        className={`overflow-hidden border-t border-gray-100/50 bg-gray-50/80 backdrop-blur-sm rounded-b-xl transition-all duration-300 ease-in-out ${
          showFilters 
            ? 'max-h-[600px] sm:max-h-96 opacity-100' 
            : 'max-h-0 opacity-0'
        }`}
        aria-hidden={!showFilters}
      >
        <div className={`p-6 transition-transform duration-300 ease-in-out ${
          showFilters ? 'translate-y-0' : '-translate-y-4'
        }`}>
          <fieldset className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
            <legend className="sr-only">Property filter options</legend>
            
            {/* Price Range */}
            <div className="space-y-2">
              <label htmlFor="min-price" className="block text-sm font-medium text-gray-700">Min Price</label>
              <Input
                id="min-price"
                type="number"
                placeholder="$0"
                value={filters.minPrice || ''}
                onChange={(e) => handleFilterChange('minPrice', e.target.value ? parseInt(e.target.value) : undefined)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                aria-describedby="min-price-desc"
              />
              <div id="min-price-desc" className="sr-only">Enter minimum price for property search</div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="max-price" className="block text-sm font-medium text-gray-700">Max Price</label>
              <Input
                id="max-price"
                type="number"
                placeholder="Any"
                value={filters.maxPrice || ''}
                onChange={(e) => handleFilterChange('maxPrice', e.target.value ? parseInt(e.target.value) : undefined)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                aria-describedby="max-price-desc"
              />
              <div id="max-price-desc" className="sr-only">Enter maximum price for property search</div>
            </div>

            {/* Property Type */}
            <div className="space-y-2">
              <label htmlFor="property-type" className="block text-sm font-medium text-gray-700">Type</label>
              <Select
                value={filters.type || 'all'}
                onValueChange={(value) => handleFilterChange('type', value === 'all' ? '' : value)}
              >
                <SelectTrigger 
                  id="property-type"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-w-0"
                  aria-describedby="property-type-desc"
                >
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="house">House</SelectItem>
                  <SelectItem value="apartment">Apartment</SelectItem>
                  <SelectItem value="condo">Condo</SelectItem>
                  <SelectItem value="townhouse">Townhouse</SelectItem>
                </SelectContent>
              </Select>
              <div id="property-type-desc" className="sr-only">Filter properties by type</div>
            </div>

            {/* Status */}
            <div className="space-y-2">
              <label htmlFor="property-status" className="block text-sm font-medium text-gray-700">Status</label>
              <Select
                value={filters.status || 'all'}
                onValueChange={(value) => handleFilterChange('status', value === 'all' ? '' : value)}
              >
                <SelectTrigger 
                  id="property-status"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-w-0"
                  aria-describedby="property-status-desc"
                >
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="for-sale">For Sale</SelectItem>
                  <SelectItem value="for-rent">For Rent</SelectItem>
                  <SelectItem value="sold">Sold</SelectItem>
                  <SelectItem value="rented">Rented</SelectItem>
                </SelectContent>
              </Select>
              <div id="property-status-desc" className="sr-only">Filter properties by availability status</div>
            </div>

            {/* Bedrooms */}
            <div className="space-y-2">
              <label htmlFor="bedrooms" className="block text-sm font-medium text-gray-700">Bedrooms</label>
              <Select
                value={filters.bedrooms?.toString() || 'any'}
                onValueChange={(value) => handleFilterChange('bedrooms', value === 'any' ? undefined : parseInt(value))}
              >
                <SelectTrigger 
                  id="bedrooms"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-w-0"
                  aria-describedby="bedrooms-desc"
                >
                  <SelectValue placeholder="Any" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any</SelectItem>
                  <SelectItem value="1">1+</SelectItem>
                  <SelectItem value="2">2+</SelectItem>
                  <SelectItem value="3">3+</SelectItem>
                  <SelectItem value="4">4+</SelectItem>
                  <SelectItem value="5">5+</SelectItem>
                </SelectContent>
              </Select>
              <div id="bedrooms-desc" className="sr-only">Filter properties by minimum number of bedrooms</div>
            </div>

            {/* Bathrooms */}
            <div className="space-y-2">
              <label htmlFor="bathrooms" className="block text-sm font-medium text-gray-700">Bathrooms</label>
              <Select
                value={filters.bathrooms?.toString() || 'any'}
                onValueChange={(value) => handleFilterChange('bathrooms', value === 'any' ? undefined : parseInt(value))}
              >
                <SelectTrigger 
                  id="bathrooms"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-w-0"
                  aria-describedby="bathrooms-desc"
                >
                  <SelectValue placeholder="Any" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any</SelectItem>
                  <SelectItem value="1">1+</SelectItem>
                  <SelectItem value="2">2+</SelectItem>
                  <SelectItem value="3">3+</SelectItem>
                  <SelectItem value="4">4+</SelectItem>
                </SelectContent>
              </Select>
              <div id="bathrooms-desc" className="sr-only">Filter properties by minimum number of bathrooms</div>
            </div>
          </fieldset>
        </div>
      </div>
    </section>
  );
};