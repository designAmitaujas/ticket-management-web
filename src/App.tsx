import Routes from "./routes/Routes";

import { configureFakeBackend } from "./helpers";

// Themes
// For Default import Theme.scss
import { AppProvider } from "./AppProvider";
import "./assets/scss/Theme.scss";

// For Dark import Theme-Dark.scss
// import './assets/scss/Theme-Dark.scss';

// configure fake backend
configureFakeBackend();

const App = () => {
  return (
    <AppProvider>
      <Routes />
    </AppProvider>
  );
};

export default App;
