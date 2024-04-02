
import AddToDo from './component/addtodo';
import Todos from "./component/todos";
import Navbar from './component/navbar';
import './App.css'
const App = () => {
  return (
    <main>
    <h1>TODO REACT + TYPESCRIPT </h1>
   
    <Navbar/>
    <AddToDo />
    <Todos/>
 </main>
  )
}

export default App