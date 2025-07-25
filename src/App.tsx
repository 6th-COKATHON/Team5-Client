import {BrowserRouter, Routes, Route} from 'react-router-dom';
import TestLayout from './layout/TestLayout';
import TestFlowPage from './pages/TestFlowPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<TestLayout />}>
          <Route path='/' element={<TestFlowPage />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
