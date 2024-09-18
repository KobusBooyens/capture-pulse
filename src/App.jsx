import { ReactQueryProvider } from "./context/ReactQueryProvider.jsx";
import AppRoutingProvider from "./context/AppRoutingProvider.jsx";

function App() {
    return (
        <ReactQueryProvider>
            <AppRoutingProvider/>
        </ReactQueryProvider>
    ); 
}

export default App;
