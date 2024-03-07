import { createContext, useState } from "react";


export let CounterContext = createContext();

export default function CounterContextProvider(props){

    const [count , setCount] = useState(0)

    return <CounterContext.Provider value={{count}}>
        {props.children}

    </CounterContext.Provider>

}