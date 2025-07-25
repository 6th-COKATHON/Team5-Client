import {BrowserRouter, Routes, Route} from 'react-router-dom';
import TestPage from './pages/TestPage';
import TestLayout from './layout/TestLayout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<TestLayout />}>
          <Route path='/' element={<TestPage />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
