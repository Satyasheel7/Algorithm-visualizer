import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import TestPage from './components/TestPage';
import SimpleHomePage from './components/SimpleHomePage';
import AlgorithmsPage from './components/AlgorithmsPage';
import SimpleHeader from './components/SimpleHeader';
import VisualizerRouter from './pages/VisualizerRouter';
import PlaygroundPage from './pages/PlaygroundPage';
import AlgorithmLearnPage from './pages/AlgorithmLearnPage';
import ArrayVisualizer from './components/Visualizers/ArrayVisualizer';
import StackVisualizer from './components/Visualizers/StackVisualizer';
import QueueVisualizer from './components/Visualizers/QueueVisualizer';
import LinkedListVisualizer from './components/Visualizers/LinkedListVisualizer';
import SearchingVisualizer from './components/Visualizers/SearchingVisualizer';
import { useAppDispatch } from './store/hooks';
import { setTheme } from './store/slices/uiSlice';
import { AuthProvider } from './contexts/AuthContext';
import { LoginPage as AuthLoginPage } from './pages/AuthLoginPage';
import { SignupPage as AuthSignupPage } from './pages/AuthSignupPage';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Initialize with light theme for a modern look
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | 'system' | null;
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
      dispatch(setTheme('dark'));
    } else {
      // Default to light theme
      document.documentElement.classList.remove('dark');
      dispatch(setTheme('light'));
      localStorage.setItem('theme', 'light');
    }

    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      const theme = localStorage.getItem('theme');
      if (theme === 'system') {
        document.documentElement.classList.remove('light', 'dark');
        document.documentElement.classList.add(e.matches ? 'dark' : 'light');
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [dispatch]);

  return (
    <AuthProvider>
      <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(20,184,166,0.12),_transparent_35%),linear-gradient(135deg,_#f8fafc_0%,_#ecfeff_48%,_#fefce8_100%)] dark:bg-[radial-gradient(circle_at_top,_rgba(15,23,42,0.95),_rgba(2,6,23,1)_68%)]">
        <SimpleHeader />
        <main className="animate-fade-in">
          <Routes>
            {/* Public Auth Routes - No protection */}
            <Route path="/login" element={<AuthLoginPage />} />
            <Route path="/signup" element={<AuthSignupPage />} />

            {/* Protected Routes - Require authentication */}
            <Route path="/" element={<ProtectedRoute><SimpleHomePage /></ProtectedRoute>} />
            <Route path="/algorithms" element={<ProtectedRoute><AlgorithmsPage /></ProtectedRoute>} />
            <Route path="/algorithms/:category" element={<ProtectedRoute><AlgorithmsPage /></ProtectedRoute>} />

            {/* Learn Routes - Documentation Pages */}
            <Route path="/learn/:algorithmId" element={<ProtectedRoute><AlgorithmLearnPage /></ProtectedRoute>} />
            <Route path="/algorithm/:algorithmId" element={<ProtectedRoute><AlgorithmLearnPage /></ProtectedRoute>} />

            {/* Data Structure Routes */}
            <Route path="/visualizer/array" element={<ProtectedRoute><ArrayVisualizer /></ProtectedRoute>} />
            <Route path="/visualizer/stack" element={<ProtectedRoute><StackVisualizer /></ProtectedRoute>} />
            <Route path="/visualizer/queue" element={<ProtectedRoute><QueueVisualizer /></ProtectedRoute>} />
            <Route path="/visualizer/linked-list" element={<ProtectedRoute><LinkedListVisualizer /></ProtectedRoute>} />

            {/* Search Algorithm Routes */}
            <Route path="/visualizer/linear-search" element={<ProtectedRoute><SearchingVisualizer /></ProtectedRoute>} />
            <Route path="/visualizer/binary-search" element={<ProtectedRoute><SearchingVisualizer /></ProtectedRoute>} />
            <Route path="/visualizer/searching" element={<ProtectedRoute><SearchingVisualizer /></ProtectedRoute>} />

            {/* General Routes */}
            <Route path="/visualizer/:algorithmId" element={<ProtectedRoute><VisualizerRouter /></ProtectedRoute>} />
            <Route path="/playground" element={<ProtectedRoute><PlaygroundPage /></ProtectedRoute>} />
            <Route path="/test" element={<ProtectedRoute><TestPage /></ProtectedRoute>} />
            <Route path="*" element={<ProtectedRoute><SimpleHomePage /></ProtectedRoute>} />
          </Routes>
        </main>
      </div>
    </AuthProvider>
  );
}

export default App;
