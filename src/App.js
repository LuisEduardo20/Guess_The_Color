import { CurrentAndLatestGames, MainContent } from "./components";
import "./styles/app_styles.scss";
import "./styles/reset.scss";
import "./styles/global_colors.scss";

function App() {
  return (
    <div className='app'>
      <CurrentAndLatestGames />
      <MainContent />
    </div>
  );
}

export default App;
