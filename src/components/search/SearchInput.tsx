"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { searchSuggestions } from "@/lib/searchData";

interface SearchInputProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  initialValue?: string;
}

export default function SearchInput({
  onSearch,
  placeholder = "Search for freelancers, skills, or services...",
  initialValue = "",
}: SearchInputProps) {
  const [query, setQuery] = useState(initialValue);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  // Sync with external value changes
  useEffect(() => {
    setQuery(initialValue);
  }, [initialValue]);

  const handleSuggestionClick = useCallback(
    (suggestion: string) => {
      setQuery(suggestion);
      setShowSuggestions(false);
      onSearch(suggestion);
    },
    [onSearch]
  );

  const handleSearch = useCallback(() => {
    if (query.trim()) {
      onSearch(query.trim());
      setShowSuggestions(false);
    }
  }, [query, onSearch]);

  // Generate suggestions based on query
  useEffect(() => {
    if (query.trim().length === 0) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    const lowerQuery = query.toLowerCase();
    const allSuggestions: string[] = [];

    // Search through all suggestion categories
    Object.values(searchSuggestions).forEach((category) => {
      category.forEach((suggestion) => {
        if (suggestion.toLowerCase().includes(lowerQuery)) {
          allSuggestions.push(suggestion);
        }
      });
    });

    // Add some generic suggestions
    const genericSuggestions = [
      "Freelancers",
      "Developers",
      "Designers",
      "Writers",
      "Marketers",
      "Consultants",
    ];

    genericSuggestions.forEach((suggestion) => {
      if (
        suggestion.toLowerCase().includes(lowerQuery) &&
        !allSuggestions.includes(suggestion)
      ) {
        allSuggestions.push(suggestion);
      }
    });

    setSuggestions(allSuggestions.slice(0, 8));
    setShowSuggestions(allSuggestions.length > 0);
    setSelectedIndex(-1);
  }, [query]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!showSuggestions) return;

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setSelectedIndex((prev) =>
            prev < suggestions.length - 1 ? prev + 1 : prev
          );
          break;
        case "ArrowUp":
          e.preventDefault();
          setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
          break;
        case "Enter":
          e.preventDefault();
          if (selectedIndex >= 0 && suggestions[selectedIndex]) {
            handleSuggestionClick(suggestions[selectedIndex]);
          } else {
            handleSearch();
          }
          break;
        case "Escape":
          setShowSuggestions(false);
          inputRef.current?.blur();
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [
    showSuggestions,
    selectedIndex,
    suggestions,
    handleSuggestionClick,
    handleSearch,
  ]);

  // Handle click outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className="relative flex">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4 z-10" />
        <Input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.trim() && setShowSuggestions(true)}
          placeholder={placeholder}
          className="pl-10 pr-24 h-12 text-base rounded-r-none"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
        />
        <Button
          onClick={handleSearch}
          className="h-12 px-6 rounded-l-none bg-primary hover:bg-primary/90"
          disabled={!query.trim()}
        >
          Search
        </Button>
      </div>

      {/* Suggestions dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <div
          ref={suggestionsRef}
          className="absolute top-full left-0 right-0 mt-1 bg-background border rounded-lg shadow-lg z-50 max-h-64 overflow-y-auto"
        >
          {suggestions.map((suggestion, index) => (
            <button
              key={suggestion}
              onClick={() => handleSuggestionClick(suggestion)}
              className={`w-full px-4 py-3 text-left hover:bg-muted transition-colors ${
                index === selectedIndex ? "bg-muted" : ""
              }`}
            >
              <div className="flex items-center gap-2">
                <Search className="h-4 w-4 text-muted-foreground" />
                <span>{suggestion}</span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
