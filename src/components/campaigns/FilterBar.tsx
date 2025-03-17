import React from "react";
import { Search, Filter, ArrowUpDown, Tag } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";

interface FilterBarProps {
  onSearch?: (term: string) => void;
  onCategoryChange?: (category: string) => void;
  onSortChange?: (sortBy: string) => void;
}

const FilterBar = ({
  onSearch = () => {},
  onCategoryChange = () => {},
  onSortChange = () => {},
}: FilterBarProps) => {
  const categories = [
    "All Categories",
    "Medical",
    "Education",
    "Emergency",
    "Community",
    "Creative",
    "Business",
    "Animals",
    "Environment",
  ];

  const sortOptions = [
    { value: "newest", label: "Newest First" },
    { value: "oldest", label: "Oldest First" },
    { value: "most-funded", label: "Most Funded" },
    { value: "closest-to-goal", label: "Closest to Goal" },
    { value: "most-pledges", label: "Most Pledges" },
  ];

  const [activeFilters, setActiveFilters] = React.useState<string[]>([]);
  const [searchTerm, setSearchTerm] = React.useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = () => {
    onSearch(searchTerm);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearchSubmit();
    }
  };

  const toggleFilter = (filter: string) => {
    if (filter === "All Categories") {
      setActiveFilters([]);
      onCategoryChange("all");
      return;
    }

    if (activeFilters.includes(filter)) {
      const newFilters = activeFilters.filter((f) => f !== filter);
      setActiveFilters(newFilters);
      onCategoryChange(newFilters.join(",") || "all");
    } else {
      const newFilters = [...activeFilters, filter];
      setActiveFilters(newFilters);
      onCategoryChange(newFilters.join(","));
    }
  };

  return (
    <div className="w-full bg-white p-4 rounded-lg shadow-sm border border-gray-100">
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-1/3">
          <Input
            type="text"
            placeholder="Search campaigns..."
            className="pl-10 pr-4 py-2 w-full"
            value={searchTerm}
            onChange={handleSearchChange}
            onKeyPress={handleKeyPress}
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Button
            variant="ghost"
            size="sm"
            className="absolute right-1 top-1/2 transform -translate-y-1/2"
            onClick={handleSearchSubmit}
          >
            Search
          </Button>
        </div>

        <div className="flex flex-wrap gap-2 w-full md:w-auto">
          <div className="flex items-center gap-2">
            <Tag className="h-4 w-4 text-gray-500" />
            <span className="text-sm font-medium">Categories:</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {categories.map((category) => (
              <Badge
                key={category}
                variant={
                  activeFilters.includes(category) ||
                  (category === "All Categories" && activeFilters.length === 0)
                    ? "default"
                    : "outline"
                }
                className="cursor-pointer"
                onClick={() => toggleFilter(category)}
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <ArrowUpDown className="h-4 w-4 text-gray-500" />
          <span className="text-sm font-medium">Sort by:</span>
          <Select onValueChange={onSortChange} defaultValue="newest">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {activeFilters.length > 0 && (
        <div className="mt-3 pt-3 border-t border-gray-100">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm text-gray-500">Active filters:</span>
            {activeFilters.map((filter) => (
              <Badge
                key={filter}
                variant="secondary"
                className="flex items-center gap-1"
              >
                {filter}
                <button
                  className="ml-1 text-gray-500 hover:text-gray-700"
                  onClick={() => toggleFilter(filter)}
                >
                  ×
                </button>
              </Badge>
            ))}
            <Button
              variant="ghost"
              size="sm"
              className="text-xs text-gray-500"
              onClick={() => {
                setActiveFilters([]);
                onCategoryChange("all");
              }}
            >
              Clear all
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterBar;
