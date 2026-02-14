import { useState, useEffect, useCallback } from "react";

export const useBeeData = () => {
  // 1. Initial state empty array
  const [data, setData] = useState([]);

  // 2. Load data on Mount (Client-side only)
  useEffect(() => {
    const loadSavedData = () => {
      try {
        const saved = localStorage.getItem("bee_2026_data");
        if (saved) {
          const parsed = JSON.parse(saved);
          // Edge case: check if it's actually an array
          if (Array.isArray(parsed)) {
            setData(parsed);
          } else {
            setData([]);
          }
        }
      } catch (e) {
        console.error("Failed to parse localStorage data", e);
        setData([]);
      }
    };

    loadSavedData();

    // 3. Tab Sync: Dusre tab me score update ho to yahan bhi dikhe
    const handleStorageChange = (e) => {
      if (e.key === "bee_2026_data") {
        try {
          setData(e.newValue ? JSON.parse(e.newValue) : []);
        } catch {
          setData([]);
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // 4. Update function with Functional Update support
  const update = useCallback((newData) => {
    setData((currentData) => {
      // Edge Case: Check if newData is a function (like prev => ...) or direct value
      const resolvedData = typeof newData === "function" ? newData(currentData) : newData;

      // Final check: hamesha array hi save ho
      const safeData = Array.isArray(resolvedData) ? resolvedData : [];
      
      try {
        localStorage.setItem("bee_2026_data", JSON.stringify(safeData));
      } catch (e) {
        console.error("Storage full or blocked", e);
      }
      
      return safeData;
    });
  }, []);

  return [data, update];
};