import { CurrentAndLatestGames, MainContent } from "./components";
import ContextProviders from "./hooks";

import "./styles/app_styles.scss";
import "./styles/reset.scss";
import "./styles/global_colors.scss";

function App() {
  return (
    <ContextProviders>
      <div className='app'>
        <CurrentAndLatestGames />
        <MainContent />
      </div>
    </ContextProviders>
  );
}

export default App;
