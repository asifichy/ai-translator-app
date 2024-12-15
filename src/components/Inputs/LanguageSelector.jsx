import React from 'react';
import { IconLanguage } from '@tabler/icons-react';


const LanguageSelector = ({ selectedLanguage, setSelectedLanguage, languages }) => (
    <span className='cursor-pointer rounded-full space-x-1 pl-2 b-black flex items-center flex-row'>
        <IconLanguage size={22} />
        <select
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            className='bg-black flex flex-row rounded-full py-1 text-white'>
                {languages.map((language) => (
                <option key={language} value={language}>
                    {language}
                </option>
            ))}
        </select>
    </span>

    /*
    const languages = [
        { code: 'en', name: 'English' },
        { code: 'es', name: 'Spanish' },
        { code: 'fr', name: 'French' },
        { code: 'de', name: 'German' },
        { code: 'it', name: 'Italian' },
        { code: 'pt', name: 'Portuguese' },
        { code: 'ru', name: 'Russian' },
        { code: 'ja', name: 'Japanese' },
        { code: 'ko', name: 'Korean' },
        { code: 'zh', name: 'Chinese' },
        { code: 'ar', name: 'Arabic' },
        { code: 'hi', name: 'Hindi' },
        { code: 'bn', name: 'Bengali' },
        { code: 'ur', name: 'Urdu' },
        { code: 'fa', name: 'Persian' },
        { code: 'tr', name: 'Turkish' },
        { code: 'th', name: 'Thai' },
        { code: 'id', name: 'Indonesian' },
        { code: 'vi', name: 'Vietnamese' },
        { code: 'el', name: 'Greek' },
        { code: 'he', name: 'Hebrew' },
        { code: 'nl', name: 'Dutch' },
        { code: 'sv', name: 'Swedish' },
        { code: 'da', name: 'Danish' }, 
        { code: 'no', name: 'Norwegian' },
        { code: 'fi', name: 'Finnish' },    
        { code: 'hu', name: 'Hungarian' }, 
    ]; */
);

export default LanguageSelector;
