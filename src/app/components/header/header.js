'use client'
import NavBar from "./navBar";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Header({ window }) {

    const router = useRouter();
    const [ cleanedUpEntries, setCleanedUpEntries ] = useState(null);

    const run_clean_up = () => {
        fetch('http://localhost:3000/api/database/models/helpers/cleanup/')
        .then((res) => res.json())
        .then((data) => {
          setCleanedUpEntries(data.result);
  
          console.log("Cleaned up entries now gone");
          console.log(data.result);
        });
        
    };

    const restrictedStyle = {position: 'fixed', top: '50%', right: '50%', aspectRatio: '1', height: '10em' };
    const restricted = <button style={restrictedStyle} onClick={() => run_clean_up()}>Clean up the database</button>


    return (
        <header style={{ minHeight: '10em' }}>
            <NavBar></NavBar>
        </header>
    );
}