import React, { useState, useRef, useEffect } from "react";
import { InputText } from "primereact/inputtext";
import "./custom.css";

interface Guess {
    content: string[],
    submitted: boolean
}

let currentLetter: number = 0;
let currentGuess: number = 0;
let correct: string = "piano";

const Wordle = (): React.JSX.Element => {

    // string array of length 5, keeps track of current guess
    let [allGuesses, setAllGuesses] = useState<Guess[]>(new Array(2).fill({content: new Array(5).fill(""), submitted: false}));

    // number, keeps track of index within current guess
    let [activeLetter, setActiveLetter] = useState<number>(0);
    let [activeGuess, setActiveGuess] = useState<number>(0);
    
    const inputRef = useRef<HTMLInputElement>(null);

    const handleOnChange = ({ target }: React.ChangeEvent<HTMLInputElement>): void => {
        const { value } = target;
        const newContent: string[] = [...allGuesses[activeGuess].content]
        newContent[currentLetter] = value.substring(value.length - 1);
        const newGuesses: Guess[] = [...allGuesses];
        newGuesses[activeGuess] = {content: newContent, submitted: false};
        if (!value) {
            setActiveLetter(currentLetter - 1);
        } else {
            setActiveLetter(currentLetter + 1);
        }
        setAllGuesses(newGuesses);
    };

    useEffect((): void => {
        inputRef.current?.focus();
    })

    const RenderLetters = (curGuessContent: string[], letterIndex: number) => {
        return(
            <InputText
                ref={letterIndex === activeLetter ? inputRef: null} 
                value={curGuessContent[letterIndex]}
                keyfilter='alpha'
                maxLength={1}
                onChange={ handleOnChange }
                onKeyDown={ (e) => {
                    currentLetter = letterIndex;
                    if (e.key === 'Backspace') {
                        setActiveLetter(currentLetter - 1);
                }} }
            />
        )
    }

    return (
        <div >
            <h2>Wordle!</h2>

            {allGuesses.map((_, guessIndex) => {
                return(
                    <div style={{marginTop: "5px"}}>
                        {allGuesses[guessIndex].content.map((_, letterIndex) => {
                            let curGuess = allGuesses[guessIndex];
                            return(
                                RenderLetters(curGuess.content, letterIndex)
                            );
                        })}
                    </div>
                    
                );
            })}
        </div>
    );
};

export default Wordle;
