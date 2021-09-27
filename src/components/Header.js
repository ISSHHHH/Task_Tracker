import Button from "./Button";
import { useLocation } from "react-router";
const Header = ({onAdd,open}) => {
    const location=useLocation();
    return (
        <header className='header'>
            <h1>Task Tracker</h1>
            {location.pathname==='/' && (<Button onClick={onAdd} color={open && '#FF2442'} text={open ? 'Close' : 'Add+'} />)}
        </header>
    )
}

export default Header
