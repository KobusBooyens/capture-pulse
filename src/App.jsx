import { ReactQueryProvider } from "./context/react-query-provider.jsx";
import RoutingProvider from "./context/routing-provider.jsx";

function App() {
    return (
        <ReactQueryProvider>
            <RoutingProvider/>
        </ReactQueryProvider>
    ); 
}

export default App;
