import { useState, useRef, useEffect } from "react";
import { useFilter } from "@/context/FilterContext";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SearchBar() {
  const { filters, setSearchQuery, searchSuggestions } = useFilter();
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleClear = () => {
    setSearchQuery("");
    inputRef.current?.focus();
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full max-w-md">
      <div className="flex items-center gap-2 bg-card border border-input rounded-full px-4 py-2">
        <Search className="h-4 w-4 text-muted-foreground" />
        <input
          ref={inputRef}
          type="text"
          placeholder="Search products..."
          value={filters.searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setIsOpen(true)}
          className="flex-1 bg-transparent outline-none text-sm"
        />
        {filters.searchQuery && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClear}
            className="h-auto p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Suggestions Dropdown */}
      {isOpen && searchSuggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-input rounded-lg shadow-lg z-50">
          <div className="p-2">
            {searchSuggestions.map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => handleSuggestionClick(suggestion)}
                className="w-full text-left px-3 py-2 rounded hover:bg-muted text-sm flex items-center gap-2 transition"
              >
                <Search className="h-3 w-3 text-muted-foreground" />
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
