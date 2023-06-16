import React, { useState } from "react";
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';

interface CounterStates {
    count: number,
    incrementValue: number
}

const Counter = () => {
    let [counter, setCounter] = useState<CounterStates>({count: 0, incrementValue: 1});
    return (
        <div>
            <h1>{counter.count}</h1>
            <br/>
            <div>
                <Dropdown placeholder="Select a value" value={counter.incrementValue} options={[1, 3, 5]} onChange={(e) => setCounter({...counter, incrementValue: e.value})}></Dropdown>
                <span className="p-buttonset">
                    <Button label={"increment by " + counter.incrementValue} onClick={() => setCounter({...counter, count: counter.count + counter.incrementValue})}/>
                    <Button label={"reset"} onClick={() => setCounter({...counter, count: 0, incrementValue: 1})}/>
                </span>
            </div>
            
        </div>
    );
};

export default Counter;