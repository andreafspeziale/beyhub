import { BrowserRouter, Navigate, Route, Routes } from 'react-router';
import { ErrorBoundary } from '@/components/error/ErrorBoundary';
import { ComparePage } from '@/pages/ComparePage';
import { ComposePage } from '@/pages/ComposePage';

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/compare" replace />} />
          <Route path="/compare" element={<ComparePage />} />
          <Route path="/compose" element={<ComposePage />} />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
