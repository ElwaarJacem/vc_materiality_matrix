import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ClientLayouts  from './layouts/client/ClientLayouts'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="client" element={<ClientLayouts/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;


{/*
import { data } from "./components/charts/data.ts";
import { BubblePlot } from "./components/charts/BubblePlot.tsx";
import SlideBar from "./components/survey/question_types/slideBar";
<BubblePlot data={data} width={800} height={800} />*/
}