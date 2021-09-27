import propTypes from 'prop-types'
const Button = ({onClick,color,text}) => {
    return (
        <button onClick={onClick} 
        className='btn' 
        style={{backgroundColor:color}}>
            {text}
        </button>
    )
}

Button.defaultProps={
    color: '#7C83FD',
    text: 'button'
}
Button.propTypes={
    color: propTypes.string,
    text: propTypes.string,
    onClick: propTypes.func
}
export default Button
