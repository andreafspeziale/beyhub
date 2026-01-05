import { ErrorBoundary } from '@/components/error/ErrorBoundary';
import { ComparePage } from '@/pages/ComparePage';

function App() {
  return (
    <ErrorBoundary>
      <ComparePage />
    </ErrorBoundary>
  );
}

export default App;
