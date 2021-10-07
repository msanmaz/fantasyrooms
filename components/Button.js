import {React,useState} from 'react'

const Button = ({buttons,doSomethingAfterClick}) => {
    const [clickedId, setClickedId] = useState(-1);
    const handleClick = (event, id) => {
        setClickedId(id);
        doSomethingAfterClick(event);
      };
    
    return (
        <>
            {buttons.map((buttonLabel,i) =>
                        <button key={i} name={buttonLabel} 
                        onClick={(event) => handleClick(event, i)} 
                        className={i === clickedId ? "buttonactive py-2 md:px-4 px-2 bg-green-500 text-white font-semibold rounded-lg shadow-md active:bg-gray-900 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75" : "py-2 md:px-4 px-2 bg-green-500 text-white font-semibold rounded-lg shadow-md active:bg-gray-900 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75"}>
                        {buttonLabel}
                    </button>
        
            )}


        </>


    )
}

export default Button