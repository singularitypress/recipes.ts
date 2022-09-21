import React, {
  createContext,
  FC,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";

export const ThemeContext = createContext({
  theme: "",
  setTheme: (theme: "dark" | "light") => {},
});

export const ThemeProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState("dark");
  const isMounted = useRef(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const ls = localStorage.getItem("theme") ?? "dark";
      setTheme(ls);
      document.documentElement.className = ls;
    }
    return () => {
      isMounted.current = true;
    };
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (isMounted.current) {
        localStorage.setItem("theme", theme);
        document.documentElement.className = theme;
      }
    }

    return () => {
      isMounted.current = true;
    };
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
