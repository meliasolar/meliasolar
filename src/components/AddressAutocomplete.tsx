import { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { MapPin } from "lucide-react";

interface AddressAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  hasError?: boolean;
}

interface RadarAddress {
  formattedAddress: string;
  addressLabel?: string;
  placeLabel?: string;
}

const RADAR_KEY = import.meta.env.VITE_RADAR_PUBLISHABLE_KEY;

const AddressAutocomplete = ({
  value,
  onChange,
  placeholder = "Enter property address",
  className = "",
  hasError = false,
}: AddressAutocompleteProps) => {
  const [suggestions, setSuggestions] = useState<RadarAddress[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const fetchSuggestions = async (query: string) => {
    if (!query || query.length < 3 || !RADAR_KEY) {
      setSuggestions([]);
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(
        `https://api.radar.io/v1/search/autocomplete?query=${encodeURIComponent(query)}&layers=address&country=US`,
        {
          headers: {
            Authorization: RADAR_KEY,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setSuggestions(data.addresses || []);
        setIsOpen(true);
      }
    } catch (error) {
      console.error("Error fetching address suggestions:", error);
      setSuggestions([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onChange(newValue);

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      fetchSuggestions(newValue);
    }, 300);
  };

  const handleSelect = (address: RadarAddress) => {
    onChange(address.formattedAddress);
    setSuggestions([]);
    setIsOpen(false);
  };

  return (
    <div ref={wrapperRef} className="relative">
      <div className="relative">
        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          type="text"
          value={value}
          onChange={handleInputChange}
          onFocus={() => suggestions.length > 0 && setIsOpen(true)}
          placeholder={placeholder}
          className={`pl-10 ${className} ${hasError ? "border-destructive" : ""}`}
          autoComplete="off"
        />
      </div>

      {isOpen && suggestions.length > 0 && (
        <div className="absolute z-50 w-full mt-1 bg-card border border-border rounded-lg shadow-lg max-h-60 overflow-auto">
          {suggestions.map((address, index) => (
            <button
              key={index}
              type="button"
              onClick={() => handleSelect(address)}
              className="w-full px-4 py-3 text-left text-sm hover:bg-muted transition-colors flex items-start gap-2 border-b border-border last:border-b-0"
            >
              <MapPin className="w-4 h-4 mt-0.5 text-muted-foreground flex-shrink-0" />
              <span className="text-foreground">{address.formattedAddress}</span>
            </button>
          ))}
        </div>
      )}

      {isLoading && value.length >= 3 && (
        <div className="absolute z-50 w-full mt-1 bg-card border border-border rounded-lg shadow-lg p-3 text-sm text-muted-foreground">
          Searching addresses...
        </div>
      )}
    </div>
  );
};

export default AddressAutocomplete;
