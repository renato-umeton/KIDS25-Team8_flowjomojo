import { ReactFlowProvider, Background } from "@xyflow/react";
import FlowEditor from './components/Flow'
import Sidebar from './components/Sidebar';
import SearchBar from './components/SearchBar';
import TopBar from './components/TopBar';
import { DnDProvider } from "./hooks/DnDContext";
import './App.css';
import '@xyflow/react/dist/style.css';

const App = () => {
    return (
        <div className="app-container">
            <DnDProvider>
                <ReactFlowProvider>
                <header className="app-header">
                    <TopBar />
                </header>
                <div className="app-body">
                    <Sidebar />
                    <main className="app-main">
                        <SearchBar />
                            <div className="editor-container">
                                <FlowEditor />
                                <Background />
                            </div>
                    </main>
                </div>
                </ReactFlowProvider>
            </DnDProvider>
        </div>
    );
};

export default App;