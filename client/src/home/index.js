import React from "react";
import { useHistory } from "react-router-dom";

const Home=()=>{
    const history= useHistory()

    const handleClick=()=>{
        history.push("/manage-table")
    }

    return(
        <div className="flex justify-center items-center h-screen">
            <button 
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded"
            onClick={handleClick}
            >
                Click me!
            </button>
        </div>
    )
}
export default Home