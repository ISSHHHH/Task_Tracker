import {useState} from 'react';

const AddTask = ({onAdd}) => {
    const [text,setText]=useState('');
    const [date,setDay]=useState('');
    const [reminder,setReminder]=useState(false);

    const onSubmit=(e)=>{
        e.preventDefault();

        if(!text)
        {
            alert('Please add text');
            return;
        }
        if(!date)
        {
            alert('Please add date and time');
            return;
        }

        onAdd({text,date,reminder});

        setText('');
        setDay('');
        setReminder(false);
    }
    return (
        <form className='add-form' onSubmit={onSubmit}>
            <div className='form-control'>
                <label>Task</label>
                <input type='text' placeholder='Add Task' 
                value={text}
                onChange={(e)=>setText(e.target.value)}
                ></input>
            </div>
            <div className='form-control'>
                <label>Day & Time</label>
                <input type='text' placeholder='Add Day & Time'
                value={date}
                onChange={(e)=>setDay(e.target.value)}
                ></input>
            </div>
            <div className='form-control form-control-check'>
                <label>Set Reminder</label>
                <input type='checkbox' value={reminder}
                onChange={(e)=>setReminder(e.currentTarget.checked)}
                ></input>
            </div>    

            <input type='submit' value='Save Task' className='btn btn-block'></input>
        </form>

    )
}

export default AddTask
