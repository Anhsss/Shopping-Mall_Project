import { useRoutes } from 'react-router-dom';   
import { routes } from './routes.tsx';

const App = () => {
    const elem = useRoutes(routes)
    return elem;
}

export default App
