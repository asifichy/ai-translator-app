"use client";
import "regenerator-runtime/runtime"; //error fix for getting run time error
import React, { useState, ChangeEvent } from "react";
import TextArea from "../components/Inputs/TextArea";
import FileUpload from "../components/Inputs/FileUpload";
import SpeechRecognition from "../components/SpeechRecognition/SpeechRecognition";
import LinkPaste from "@/components/Inputs/LinkPaste";
import LanguageSelector from "@/components/Inputs/LanguageSelector";
import useTranslate from "@/hooks/useTranslate";
import { rtfToText } from "@/utils/rtfToText";
import {
  IconCopy,
  IconStar,
  IconThumbDown,
  IconThumbUp,
  IconVolume
} from "@tabler/icons-react";
import SvgDecorations from "@/components/SvgDecorations";
import CategoryLinks from "@/components/categoryLinks";

export default function Home() {
  const [sourceText, setSourceText] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);
  const [favorite, setFavorite] = useState<boolean>(false);
  const [Languages] = useState<string[]>([
    "English",
    "French",
    "Spanish",
    "German",
    "Chinese",
    "Bengali",
    "Hindi",
    "Arabic",
    "Japanese",
    "Korean",
    "Italian",
    "Portuguese",
    "Russian",
    "Turkish",
    "Vietnamese"
  ]);

  //making the English as default language at first
  const [selectedLanguage, setSelectedLanguage] = useState<string>("English");
  //using the hook
  const targetText = useTranslate(sourceText, selectedLanguage);

  const handleAudioPlayback = (text: string) => {
    const utterence = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterence);
  };

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const rtfContent = reader.result as string;
        const text = rtfToText(rtfContent);
        setSourceText(text);
      };
      reader.readAsText(file);
    }
  };

  const handleLinkPaste = (text: string) => {
    const url = text.trim();
    const isValidUrl = /^https?:\/\/[^\s]+$/i.test(url);
    if (isValidUrl) {
      setSourceText(url);
    } else {
      console.error("Invalid URL");
    }
  };

  const handleCopyToClipboard = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(targetText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } else {
      const textarea = document.createElement('textarea');
      textarea.value = targetText;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleLike = () => {
    // Implement like logic
  };

  const handleDislike = () => {
    // Implement dislike logic
  };

  const handleFavorite = () => {
    setFavorite(!favorite);
    if (!favorite) {
      localStorage.setItem("favoriteTranslation", targetText);
    } else {
      localStorage.removeItem("favoriteTranslation");
    }
  };

  return (
    <div className="h-[50rem] w-full dark:bg-black bg-white  dark:bg-dot-white/[0.2] bg-dot-black/[0.2] relative flex items-center justify-center">
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>

      <div className="relative overflow-hidden h-screen">
        <div className="max-w-[85rem] mx-auto px-4 sm:px-6 py-16 sm:py-24">
          <div className="text-center">
            <h1 className="text-4xl sm:text-6xl font-bold text-neutral-200 mt-[-70px]">
              Interpret<span className="text-[#f87315]">AI</span>
            </h1>
            <p>Language Freedom for Everyone</p>

            <div className="mt-7 sm:mt-12 mx-auto max-w-3xl relative">
              <div className="grid gap-4 md:grid-cols-2 grid-cols-1">
                {/* Left Input Section */}
                <div className="relative z-10 flex flex-col space-x-3 border rounded-lg shawdow-lg bg-neutral-900 border-neutral-700 shadow-gray-900/20">
                  {/* Input Field Component */}
                  <TextArea
                    id="source language"
                    value={sourceText}
                    onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
                      setSourceText(e.target.value);
                    }}
                    placeholder={"Source Language"}
                  />
                  <div className="flex flex-row justify-between w-full">
                    <span className="cursor-pointer flex space-x-2 flex-row">
                      {/* Speech Recognition Component */}
                      <SpeechRecognition setSourceText={setSourceText} />
                      {/* Icon Component */}
                      <IconVolume
                        size={22}
                        onClick={() => {
                          handleAudioPlayback(sourceText);
                        }}
                      />
                      {/* File Upload Component */}
                      <FileUpload handleFileUpload={handleFileUpload} />
                      {/* Link Paste Component */}
                      <LinkPaste handleLinkPaste={handleLinkPaste} />
                    </span>
                    <span className="text-sm pr-5">
                      {sourceText.length} / 2000
                    </span>
                  </div>
                </div>

                {/* Right Output Section */}
                <div className="relative z-10 flex flex-col space-x-3 border rounded-lg shawdow-lg bg-neutral-900 border-neutral-700 shadow-gray-900/20">
                  {/* Input Field Component */}
                  <TextArea
                    id="target language"
                    value={targetText}
                    onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
                      setSourceText(e.target.value);
                    }}
                    placeholder={"Translated Language"}
                  />
                  <div className="flex flex-row justify-between w-full pb-2">
                    <span className="cursor-pointer flex space-x-2 flex-row">
                      {/* Language Selector Component */}
                      <LanguageSelector
                        selectedLanguage={selectedLanguage}
                        setSelectedLanguage={setSelectedLanguage}
                        languages={Languages}
                      />
                      {/* Icon Component */}
                      <IconVolume
                        size={22}
                        onClick={() => {
                          handleAudioPlayback(targetText);
                        }}
                      />                      
                    </span>
                    <div className="flex flex-row items-center space-x-2 pr-4 cursor-pointer">
                      <IconCopy size={22} onClick={handleCopyToClipboard} />
                      {copied && (
                        <span className="text-xs text-green-500">Copied!</span>
                      )}
                      <IconThumbUp size={22} onClick={handleLike} />
                      <IconThumbDown size={22} onClick={handleDislike} />
                      <IconStar
                        size={22}
                        onClick={handleFavorite}
                        className={favorite ? "text-yellow-500" : ""}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <SvgDecorations />
            </div>
            <CategoryLinks />
          </div>          
        </div>
      </div>
    </div>
  );
}