import React, { useState, useEffect } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import { IconMicrophone } from "@tabler/icons-react";
import { div } from "framer-motion/client";

const SpeechRecognitionComponent = ({setSourceText}) => {

    const [ transcript, listening ] = useSpeechRecognition();

    useEffect(() => {
        setSourceText(transcript);
    }, [transcript, setSourceText]);


    //external voice input
    const handlingVoiceRecognition = () => {
        if (listening) {
            SpeechRecognition.stopListening();
        } else {
            SpeechRecognition.startListening();
        }
    };

    return (
        <div>
            <IconMicrophone 
            size={22}
            className="text-grey-400"
            onClick={handlingVoiceRecognition} 
            />
        </div>
    )

}

export default SpeechRecognitionComponent;
