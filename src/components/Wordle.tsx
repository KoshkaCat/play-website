import React, { useState, useRef, useEffect } from "react";
import { InputText } from "primereact/inputtext";
import "./custom.css";
import axios from "axios";

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
let correct: string = "acorn";

const options = axios.create({
    method: 'GET',
    url: "https://api.dictionaryapi.dev/api/v2/entries/en/"
});

const green = {
    width: "40px",
    backgroundColor: "#44CA44",
    color: "#000000"
}

const yellow = {
    width: "40px",
    backgroundColor: "#FAF25D",
    color: "#000000"
}

const red = {
    width: "40px",
    backgroundColor: "#E83131",
    color: "#000000"
}


const Wordle = (): React.JSX.Element => {

    // string array of length 5, keeps track of current guess
    let [allGuesses, setAllGuesses] = useState<Guess[]>(new Array(6).fill({content: new Array(5).fill({letter: "", color: 0}), submitted: false}));

    // number, keeps track of index within current guess
    let [activeLetter, setActiveLetter] = useState<number>(0);
    let [activeGuess, setActiveGuess] = useState<number>(0);
        
    let [success, setSuccess] = useState<number>(0);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleOnChange = ({ target }: React.ChangeEvent<HTMLInputElement>): void => {
        const { value } = target;
        const newContent: Letter[] = [...allGuesses[activeGuess].content]
        // TODO: figure out why this works lol
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
        let letters: string[] = new Array(5).fill("");
        let colorGuess: Guess = {...allGuesses[guessIndex]};
        let newGuesses: Guess[] = [...allGuesses];
        for (let i = 0; i < curGuessContent.length; i++) {
            letters[i] = curGuessContent[i].letter;
        }

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
                            let word = letters.join("");
                            axios.get("https://api.dictionaryapi.dev/api/v2/entries/en/" + word).then((res) => {
                                if (res.status === 200) {
                                    setSuccess(1);
                                }
                            }).catch((_err) => {
                                setSuccess(0);
                                
                                console.log("success: ", success);
                            });

                            if (success === 1) {
                                setSuccess(0);
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
                                    setAllGuesses(newGuesses);
                                    setActiveGuess(currentGuess + 1);
                                    currentGuess++;
                                    setActiveLetter(0);
                                    currentLetter = 0;
                                }
                            }
                        }
                    } }
                />
            )
        } else if (!submitted && (guessIndex > currentGuess)) {
            return(
                <InputText
                    ref={null}
                    value={letters[letterIndex]}
                    disabled
                />
            )
        } else if (submitted === true) {
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
            return(
                <InputText
                    ref={null}
                    value={letters[letterIndex]}
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