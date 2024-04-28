'use client';
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Toolbar } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useContext } from 'react'
import { UserContext } from '@/app/components/header/userAuthentication';



export default function Page() {

    const router = useRouter();
    const { user, voter, admin, teller } = useContext(UserContext);
    const [media, setMedia] = React.useState(null);
    const [file, setFile] = React.useState(null);

    const fileInputRef = React.useRef();

    const handleFileInputClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (event) => {

        if (event.target.files && event.target.files.length > 0) {
            console.log(event.target.files);
            if (event.target.files[0]) {
                const file = event.target.files[0];
                console.log("file: ");
                console.log(file);
                setFile(file);
            } else {
                console.log("Not found. ");
            }
        } else {
            console.log("No file selected. ")
        };
    };


    const handleSubmit = async (event) => {

        if (file) {
            event.preventDefault();
            console.log("event.currentTarget: ");
            console.log(event.currentTarget);
            const formData = new FormData(event.currentTarget);
            // Print the contents of the FormData object
            for (const [key, value] of formData.entries()) {
                console.log(`${key}: ${value}`);
            }

            formData.append('file', file);
            console.log("file: ");
            console.log(file);

            // Print the contents of the FormData object
            for (const [key, value] of formData.entries()) {
                console.log(`${key}: ${value}`);
            }


            const request1 = new Request(`http://localhost:3000/api/database/controllers/User/Media/add_media_to_my_storage?userID=${user._id}`, {
                method: 'POST',
                body: formData,
            });

            await fetch(request1).then(res => res.json()).then(data => {
                setMedia(data.result);

                console.log("Media data: ");
                console.log(data.result);
            })
        };
    };

    if (media) {
        router.push("User/Media");
    }

    return (
        <>

            <Toolbar></Toolbar>
            <form onSubmit={handleSubmit}>
                <p>Click on the button to add new media. </p>
                <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                    title="Choose a file to upload"
                />

                <Button
                    variant='contained'
                    component="span"
                    onClick={handleFileInputClick}
                >Upload File</Button>

                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Confirm
                </Button>
            </form>

        </>
    );
}