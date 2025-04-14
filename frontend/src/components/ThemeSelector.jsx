import { useState, useEffect } from 'react';

const themes = [
  { name: 'light', label: 'Light' },
  { name: 'dark', label: 'Dark' },
  { name: 'blue', label: 'Blue' },
  { name: 'green', label: 'Green' },
];
export default function ThemeSelector() {
        const [theme, setTheme] = useState('light');
      
        useEffect(() => {
          const savedTheme = localStorage.getItem('theme') || 'light';
          setTheme(savedTheme);
          document.documentElement.setAttribute('data-theme', savedTheme);
        }, []);

        const handleThemeChange = (e) => {
                const selectedTheme = e.target.value;
                setTheme(selectedTheme);
                document.documentElement.setAttribute('data-theme', selectedTheme);
                localStorage.setItem('theme', selectedTheme);
              };
              return (
                <select
                  value={theme}
                  onChange={handleThemeChange}
                  className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
                >
                  {themes.map((t) => (
                    <option key={t.name} value={t.name}>
                      {t.label}
                    </option>
                  ))}
                </select>
              );
            }
            