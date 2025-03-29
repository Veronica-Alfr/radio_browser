import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RadioList } from "./pages/RadioList";
import { RadioProvider } from "./context/RadioProvider";
import { FavoriteRadioList } from "./pages/FavoriteRadioList";
import { EditRadioProvider } from "./context/EditStationProvider"; 

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RadioProvider>
        <EditRadioProvider>
          <Router>
            <Routes>
              <Route path="/" element={<RadioList />} />
              <Route path="/radio/favorites" element={<FavoriteRadioList />} />
            </Routes>
          </Router>
        </EditRadioProvider>
      </RadioProvider>
    </QueryClientProvider>
  );
}

export default App;
