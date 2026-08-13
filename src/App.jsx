
import './App.css'
import Home from './assets/Home'
import About from './assets/About'

function App() {
  
  return (
    <>
    {/* previous and latest data */}
      <Home name="bhumika" age={124}></Home>
      <Home name="diksha" age={20}></Home>
      <About name="amit"></About>
    </>
  )
}

export default App
  {/* <Navbar />


      <div className="p-10">
        <h1 className="text-4xl font-bold">
          Welcome to my website
        </h1>
      </div> */}