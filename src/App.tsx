import { useState } from "react";
import Container from "./components/container/Container";
import Tensorflow from "./components/tensorflowsigner/tensorflow";

function App() {
  const [modelName, setModelName] = useState("");

  return (
    <div className="content-app">
      <Tensorflow setModelName={setModelName} modelName={modelName} />
      <Container modelName={modelName} />
    </div>
  );
}

export default App;
