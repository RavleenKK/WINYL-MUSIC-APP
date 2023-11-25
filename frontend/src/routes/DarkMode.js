import { createContext, useState } from "react";
import ReactSwitch from "react-switch";
export const ThemeContext = createContext(null);

function Switch() {
  const [theme, setTheme] = useState("light");

  const ToggleTheme = () => {
    setTheme((curr) => (curr === "light" ? "dark" : "light"));
  };
  return (
    <ThemeContext.Provider value={(theme, ToggleTheme)}>
      <div className="App" id={theme}>
        <div className="switch">
          <ReactSwitch
            onChange={ToggleTheme}
            checked={theme === "light"}
            defaultChecked
          />
        </div>
      </div>
    </ThemeContext.Provider>
  );
}

export default Switch;
