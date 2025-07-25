import {BrowserRouter, Routes, Route} from 'react-router-dom';
import TestLayout from './layout/TestLayout';
import TestFlowPage from './pages/TestFlowPage';
import ChemistryLayout from './layout/ChemistryLayout';
import ChemistryPage from './pages/ChemistryPage';
import CreateChemistryPage from './pages/CreateChemistryPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<TestLayout />}>
          <Route index element={<TestFlowPage />}></Route>
          <Route path='/create' element={<CreateChemistryPage />}></Route>
        </Route>
        <Route element={<ChemistryLayout />}>
          <Route path='/chemistry' element={<ChemistryPage />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
