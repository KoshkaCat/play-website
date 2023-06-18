import React, { useState, useRef, useEffect } from "react";
import { InputText } from "primereact/inputtext";
import "./custom.css";

// 0 = red, 1 = yellow, 2 = green
interface Letter {
    letter: string,
    color: number
}

interface Guess {
    content: Letter[],
    submitted: boolean
}

let currentLetter: number = 0;
let currentGuess: number = 0;
let correct: string = "piano";

const green = {
    width: "40px",
    backgroundColor: "green"
}

const yellow = {
    width: "40px",
    backgroundColor: "yellow"
}

const red = {
    width: "40px",
    backgroundColor: "red"
}


const Wordle = (): React.JSX.Element => {

    // string array of length 5, keeps track of current guess
    let [allGuesses, setAllGuesses] = useState<Guess[]>(new Array(6).fill({content: new Array(5).fill({letter: "", color: 0}), submitted: false}));

    // number, keeps track of index within current guess
    let [activeLetter, setActiveLetter] = useState<number>(0);
    let [activeGuess, setActiveGuess] = useState<number>(0);
    
    const inputRef = useRef<HTMLInputElement>(null);

    const handleOnChange = ({ target }: React.ChangeEvent<HTMLInputElement>): void => {
        console.log("changed");
        const { value } = target;
        const newContent: Letter[] = [...allGuesses[activeGuess].content]
        // TODO: change to "value[0]" since it should only be one?
        newContent[currentLetter] = {letter: value.substring(value.length - 1), color: 0};
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

    const RenderLetter = (curGuessContent: Letter[], letterIndex: number, submitted: boolean, guessIndex: number) => {
        console.log("guessIndex: ", guessIndex);
        let letters: string[] = new Array(5).fill("");
        let colorGuess: Guess = {...allGuesses[guessIndex]};
        let newGuesses: Guess[] = [...allGuesses];
        for (let i = 0; i < curGuessContent.length; i++) {
            letters[i] = curGuessContent[i].letter;
        }
        console.log("currentGuess: ", currentGuess, ", guessIndex: ", guessIndex, ", submitted: ", allGuesses[guessIndex].submitted);
        if (!submitted && (guessIndex === currentGuess)) {
            return(
                <InputText
                    ref={letterIndex === activeLetter ? inputRef: null} 
                    value={letters[letterIndex]}
                    keyfilter='alpha'
                    maxLength={1}
                    onChange={ handleOnChange }
                    onKeyDown={ (e) => {
                        currentLetter = letterIndex;
                        if (e.key === 'Backspace') {
                            setActiveLetter(currentLetter - 1);
                        }
                        if (e.key === 'Enter' && activeLetter === 5) {
                            console.log("enter!");
                            colorGuess.submitted = true;
                            if (letters.join("") === correct) {
                                for (let i = 0; i < colorGuess.content.length; i++) {
                                    colorGuess.content[i].color = 2;
                                }
                                newGuesses[activeGuess] = colorGuess;
                                setAllGuesses(newGuesses);
                                currentGuess = 10;
                                setActiveGuess(10);
                            } else {
                                // TODO: check if word contains useful letters
                                for (let i = 0; i < colorGuess.content.length; i++) {
                                    for (let j = 0; j < colorGuess.content.length; j++) {
                                        if (colorGuess.content[i].letter === correct[j]) {
                                            if (i === j) {
                                                colorGuess.content[i].color = 2;
                                            } else {
                                                colorGuess.content[i].color = 1;
                                            }
                                        }
                                    }
                                }
                                newGuesses[guessIndex] = colorGuess;
                                //console.log("newGuesses[guessIndex].submitted: ", newGuesses[guessIndex].submitted);
                                console.log("newGuesses: ", newGuesses);
                                console.log("unmodified allGuesses: ", allGuesses);
                                setAllGuesses(newGuesses);
                                //console.log("index: ", guessIndex, ", submitted: ", allGuesses[guessIndex].submitted);
                                console.log("allGuesses: ", allGuesses)
                                setActiveGuess(currentGuess + 1);
                                currentGuess++;
                                setActiveLetter(0);
                                currentLetter = 0;
                            }
                            
                        }
                    } }
                />
            )
        } else if (!submitted && (guessIndex > currentGuess)) {
            console.log("2 submitted: ", submitted, "guessIndex: ", guessIndex, "currentGuess: ", currentGuess);
            return(
                <InputText
                    ref={null}
                    value={letters[letterIndex]}
                    disabled
                />
            )
        } else if (submitted === true) {
            console.log("3 submitted: ", submitted);
            if (colorGuess.content[letterIndex].color === 2) {
                return(
                    <InputText
                        ref={null}
                        value={letters[letterIndex]}
                        disabled
                        style={green}
                    />
                )
            } else if (colorGuess.content[letterIndex].color === 1) {
                return(
                    <InputText
                        ref={null}
                        value={letters[letterIndex]}
                        disabled
                        style={yellow}
                    />
                )
            } else {
                return(
                    <InputText
                        ref={null}
                        value={letters[letterIndex]}
                        disabled
                        style={red}
                    />
                )
            }
        } else {
            console.log("currentGuess: ", currentGuess, ", guessIndex: ", guessIndex, ", submitted: ", allGuesses[guessIndex].submitted);
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
                                RenderLetter(curGuess.content, letterIndex, curGuess.submitted, guessIndex)
                            );
                        })}
                    </div>  
                );
            })}
        </div>
    );
};

export default Wordle;
