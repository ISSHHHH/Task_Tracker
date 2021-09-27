import './App.css';
import {BrowserRouter as Router,Route} from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Tasks from './components/Tasks';
import AddTask from './components/AddTask';
import About from './components/About';
import {useState,useEffect} from 'react';

function App() {
  const [showAddTask,setShowAddTask]=useState(false);
  const [tasks,setTasks]=useState([]);

  //JSON Server
  useEffect(()=>{
    const getTasks = async()=> {
      const tasksFromServer= await fetchTasks();
      //console.log(tasksFromServer);
      setTasks(tasksFromServer);
    }

    getTasks();
  },[])

  //Fetching Tasks from Server
  const fetchTasks= async()=>{
      const res=await fetch('http://localhost:5000/tasks');
      const data = res.json();
      return data;
    }

  //Fetching a single Task from Server
  const fetchTask= async(id)=>{
      const res=await fetch(`http://localhost:5000/tasks/${id}`);
      const data = res.json();
      return data;
    }
  //Functions to manage tasks

  //Add task
  const addTask = async (task)=>{
    const res = await fetch('http://localhost:5000/tasks',{
      method:'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(task)
    })

    const data= await res.json();
    setTasks([...tasks,data]);
  }
  //Delete Task
  const deleteTask=async(id)=>{
    await fetch(`http://localhost:5000/tasks/${id}`,{
      method:'DELETE',
    })
    setTasks(tasks.filter((task)=>task.id!==id));
  }

  //Toggle Reminder
  const toggleReminder= async(id)=>{
    const taskToToggle = await fetchTask(id);
    const updatedTask = {...taskToToggle,reminder:!taskToToggle.reminder};

    const res = await fetch(`http://localhost:5000/tasks/${id}`,{
      method:'PUT',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedTask),
    })

    const data = await res.json();

    setTasks(
        tasks.map((task)=> 
          id==task.id ? {...task,reminder: data.reminder} : task
      )
    )
  }

  return (
    <Router>
    <div className="container">
      <Header onAdd={()=>setShowAddTask(!showAddTask)} open={showAddTask}/>
      {/*{showAddTask && <AddTask onAdd={addTask} />}
      {tasks.length > 0 ?
      <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder}/> : 'No Tasks'
      } */}
      <Route path='/' exact render={(props)=> 
      (
        <>
          {showAddTask && <AddTask onAdd={addTask} />}
          {tasks.length > 0 ?
          <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder}/> : 'No Tasks'
          } 
        </>
      )
      }/>
      <Route path='/About' component={About}/>
      <Footer/>
    </div>
    </Router>
  );
}

export default App;
