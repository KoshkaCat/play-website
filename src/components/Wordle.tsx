import React, { useState, useRef, useEffect } from "react";
import { InputText } from "primereact/inputtext";
import "./custom.css";


interface Letter {
    letter: string,
    ref: React.MutableRefObject<null>
}

interface Guess {
    first: Letter,
    second: Letter,
    third: Letter,
    fourth: Letter,
    fifth: Letter
}

const Wordle = () => {

    let [guess, setGuess] = useState<Guess>({first: {letter: "", ref: useRef(null)}, 
                                            second: {letter: "", ref: useRef(null)}, 
                                            third: {letter: "", ref: useRef(null)}, 
                                            fourth: {letter: "", ref: useRef(null)}, 
                                            fifth: {letter: "", ref: useRef(null)}
                                        });
    // useEffect(() => {
    //     guess.first.ref.current.focus();
    // })

    return (
        <div >
            <h2>Wordle!</h2>
            <InputText 
                ref={guess.first.ref}
                value={guess.first.letter}
                keyfilter='alpha'
                type='alpha'
                maxLength={1}
                onKeyDown={(e) => {setGuess({...guess, first: {...guess.first, letter: e.key}})
                                console.log(e.target.value)
                                if (e.target.value) {
                                    guess.second.ref.current.focus();}
                                }}
            />
            <InputText 
                ref={guess.second.ref}
                value={guess.second.letter} 
                onChange={(e) => {setGuess({...guess, second: {...guess.second, letter: e.target.value}})
                                guess.third.ref.current.focus();}}
                onKeyDown={(e) => { if (e.key === 'Backspace') {setGuess({...guess, second: {...guess.second, letter: ""}});
                                                                console.log(guess.first.letter);
                                                                guess.first.ref.current.focus(); } }}
                keyfilter='alpha'
                maxLength={1}
            />
            <InputText 
                ref={guess.third.ref}
                value={guess.third.letter} 
                onChange={(e) => {setGuess({...guess, third: {...guess.third, letter: e.target.value}})
                                guess.fourth.ref.current.focus();}}
                keyfilter='alpha'
                maxLength={1}
            />
            <InputText 
                ref={guess.fourth.ref}
                value={guess.fourth.letter} 
                onChange={(e) => {setGuess({...guess, fourth: {...guess.fourth, letter: e.target.value}})
                                guess.fifth.ref.current.focus();}}
                keyfilter='alpha'
                maxLength={1}
            />
            <InputText 
                ref={guess.fifth.ref}
                value={guess.fifth.letter} 
                onChange={(e) => setGuess({...guess, fifth: {...guess.fifth, letter: e.target.value}})}
                keyfilter='alpha'
                maxLength={1}
            />
        </div>
    );
};

export default Wordle;
