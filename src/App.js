import { data } from "./components/charts/data.ts";
import { BubblePlot } from "./components/charts/BubblePlot.tsx";

function App() {
  return (
    <div className="App" style={{marginLeft: '20px', padding  : '10px' }}>
      <BubblePlot data={data} width={800} height={800} />
    </div>
  );
}

export default App;
