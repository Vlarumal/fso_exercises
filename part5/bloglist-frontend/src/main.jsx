import ReactDOM from 'react-dom/client'
import App from './App'
import { NotificationContextProvider } from './NotificationContext'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { LoggedContextProvider } from './LoggedContext'
import { BrowserRouter as Router } from 'react-router-dom'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <LoggedContextProvider>
    <Router>
      <QueryClientProvider client={queryClient}>
        <NotificationContextProvider>
          <App />
        </NotificationContextProvider>
      </QueryClientProvider>
    </Router>
  </LoggedContextProvider>
)
