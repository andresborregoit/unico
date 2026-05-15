'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronDown, ChevronUp } from 'lucide-react'
import { cn } from '@/lib/utils'
import { BrutalButton } from '@/components/shared/brutal-button'

export interface FilterOption {
  value: string
  label: string
  count?: number
}

export interface FilterGroup {
  id: string
  label: string
  options: FilterOption[]
  type: 'checkbox' | 'radio'
}

interface FilterSidebarProps {
  isOpen: boolean
  onClose: () => void
  filterGroups: FilterGroup[]
  selectedFilters: Record<string, string[]>
  onFilterChange: (groupId: string, values: string[]) => void
  onClearAll: () => void
}

export function FilterSidebar({
  isOpen,
  onClose,
  filterGroups,
  selectedFilters,
  onFilterChange,
  onClearAll,
}: FilterSidebarProps) {
  const [expandedGroups, setExpandedGroups] = useState<string[]>(
    filterGroups.map((g) => g.id)
  )

  const toggleGroup = (groupId: string) => {
    setExpandedGroups((prev) =>
      prev.includes(groupId)
        ? prev.filter((id) => id !== groupId)
        : [...prev, groupId]
    )
  }

  const handleOptionToggle = (groupId: string, value: string, type: 'checkbox' | 'radio') => {
    const currentValues = selectedFilters[groupId] || []
    
    if (type === 'radio') {
      onFilterChange(groupId, [value])
    } else {
      if (currentValues.includes(value)) {
        onFilterChange(groupId, currentValues.filter((v) => v !== value))
      } else {
        onFilterChange(groupId, [...currentValues, value])
      }
    }
  }

  const totalSelectedFilters = Object.values(selectedFilters).flat().length

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop - Mobile Only */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
            onClick={onClose}
          />

          {/* Sidebar */}
          <motion.aside
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className={cn(
              'fixed top-0 left-0 bottom-0 w-full max-w-xs bg-card z-40 flex flex-col border-r border-border',
              'lg:static lg:translate-x-0 lg:max-w-none lg:w-64 lg:border-r-0 lg:bg-transparent'
            )}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border lg:border-b-0 lg:pb-6">
              <span className="text-xs tracking-[0.2em] uppercase">
                FILTERS {totalSelectedFilters > 0 && `(${totalSelectedFilters})`}
              </span>
              <div className="flex items-center gap-2">
                {totalSelectedFilters > 0 && (
                  <button
                    onClick={onClearAll}
                    className="text-xs tracking-wider text-muted-foreground hover:text-foreground transition-colors"
                  >
                    CLEAR ALL
                  </button>
                )}
                <button
                  onClick={onClose}
                  className="p-2 -mr-2 text-foreground hover:text-accent transition-colors lg:hidden"
                  aria-label="Close filters"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Filter Groups */}
            <div className="flex-1 overflow-y-auto p-4 lg:p-0 space-y-6">
              {filterGroups.map((group) => {
                const isExpanded = expandedGroups.includes(group.id)
                const selectedValues = selectedFilters[group.id] || []

                return (
                  <div key={group.id} className="border-b border-border pb-6 last:border-b-0">
                    <button
                      onClick={() => toggleGroup(group.id)}
                      className="flex items-center justify-between w-full text-left"
                    >
                      <span className="text-xs tracking-[0.15em] uppercase text-foreground">
                        {group.label}
                        {selectedValues.length > 0 && (
                          <span className="ml-2 text-accent">({selectedValues.length})</span>
                        )}
                      </span>
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4 text-muted-foreground" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-muted-foreground" />
                      )}
                    </button>

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="pt-4 space-y-3">
                            {group.options.map((option) => {
                              const isSelected = selectedValues.includes(option.value)

                              return (
                                <label
                                  key={option.value}
                                  className="flex items-center gap-3 cursor-pointer group"
                                >
                                  <div
                                    className={cn(
                                      'w-4 h-4 border flex items-center justify-center transition-colors',
                                      group.type === 'radio' ? 'rounded-full' : '',
                                      isSelected
                                        ? 'border-foreground bg-foreground'
                                        : 'border-border group-hover:border-muted-foreground'
                                    )}
                                  >
                                    {isSelected && (
                                      <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className={cn(
                                          'bg-background',
                                          group.type === 'radio' ? 'w-1.5 h-1.5 rounded-full' : 'w-2 h-0.5'
                                        )}
                                      />
                                    )}
                                  </div>
                                  <input
                                    type={group.type}
                                    name={group.id}
                                    value={option.value}
                                    checked={isSelected}
                                    onChange={() => handleOptionToggle(group.id, option.value, group.type)}
                                    className="sr-only"
                                  />
                                  <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors flex-1">
                                    {option.label}
                                  </span>
                                  {option.count !== undefined && (
                                    <span className="text-xs text-muted-foreground">
                                      ({option.count})
                                    </span>
                                  )}
                                </label>
                              )
                            })}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )
              })}
            </div>

            {/* Apply Button - Mobile Only */}
            <div className="p-4 border-t border-border lg:hidden">
              <BrutalButton onClick={onClose} className="w-full">
                APPLY FILTERS
              </BrutalButton>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
