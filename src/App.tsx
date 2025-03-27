import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RadioList } from "./pages/RadioList";
import { RadioProvider } from './context/RadioContext';
import { FavoriteRadioList } from "./pages/FavoriteRadioList";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RadioProvider>
        <Router>
          <Routes>
            <Route path="/" element={<RadioList />} />
            <Route path="/radio/favorites" element={<FavoriteRadioList />} />
          </Routes>
        </Router>
      </RadioProvider>
    </QueryClientProvider>
  );
}

export default App;
