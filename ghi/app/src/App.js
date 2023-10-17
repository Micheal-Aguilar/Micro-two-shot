import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./MainPage";
import Nav from "./Nav";
import ListHats from "./ListHats";
import HatsForm from "./HatsForm";
import ShoeList from "./ShoeList";
import ShoeForm from "./ShoeForm";

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route index element={<MainPage />} />
          <Route path="hats">
            <Route index element={<ListHats />} />
            <Route path="new" element={<HatsForm />} />
          </Route>
          <Route path="shoes">
            <Route index element={<ShoeList />} />
            <Route path="new" element={<ShoeForm />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
