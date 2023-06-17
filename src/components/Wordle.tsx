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

const green = {
    width: "40px",
    textAlign: "center",
    backgroundColor: "green"
}

const yellow = {
    width: "40px",
    textAlign: "center",
    backgroundColor: "yellow"
}

const red = {
    width: "40px",
    textAlign: "center",
    backgroundColor: "red"
}


const Wordle = (): React.JSX.Element => {

    // string array of length 5, keeps track of current guess
    let [allGuesses, setAllGuesses] = useState<Guess[]>(new Array(6).fill({content: new Array(5).fill(""), submitted: false}));

    // number, keeps track of index within current guess
    let [activeLetter, setActiveLetter] = useState<number>(0);
    let [activeGuess, setActiveGuess] = useState<number>(0);
    
    const inputRef = useRef<HTMLInputElement>(null);

    const handleOnChange = ({ target }: React.ChangeEvent<HTMLInputElement>): void => {
        console.log("changed");
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

    const RenderLetters = (curGuessContent: string[], letterIndex: number, submitted: boolean, guessIndex: number) => {
        if (!submitted && (guessIndex === currentGuess)) {
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
                        }
                        if (e.key === 'Enter' && activeLetter === 5) {
                            if (allGuesses[currentGuess].content.join("") === correct) {
                                currentGuess = 10;
                                setActiveGuess(10);
                            } else {
                                // check if word contains useful letters
                                for (let i = 0; i < 5; i++) {
                                    
                                }

                                setActiveGuess(currentGuess + 1);
                                currentGuess++;
                                setActiveLetter(0);
                                currentLetter = 0;
                            }
                            
                        }
                    } }
                />
            )
        } else {
            return(
                <InputText
                    ref={null}
                    disabled
                />
            )
        }
    }

    return (
        <div>
            <h2>Wordle!</h2>

            {allGuesses.map((_, guessIndex) => {
                return(
                    <div style = {{marginTop: "5px"}}>
                        {allGuesses[guessIndex].content.map((_, letterIndex) => {
                            let curGuess = allGuesses[guessIndex];
                            return(
                                RenderLetters(curGuess.content, letterIndex, false, guessIndex)
                            );
                        })}
                    </div>  
                );
            })}
        </div>
    );
};

export default Wordle;
