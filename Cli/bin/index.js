#!/usr/bin/env node

import fs from 'fs' ; 

const [, , command, id] = process.argv ; 
const BASE_URL = "https://component-io-backend.vercel.app"


const RUN = async () => {
    if( command === 'get' && id ){

        try {
            console.log("⏳ Fetching from Component.io...");
            // API Call 
            const res = await fetch(`${BASE_URL}/cli/get-component/${id}`); 
            const data = await res.json(); 

            if( data.success && data.fileName ){
                // Creating File ... 
                fs.writeFileSync( data.fileName , data.code); 

                console.log(`✅ Done ${data.fileName} Created!`); 
            }
            else{
                console.log("❌ Error:", data.message);
            }
        }

        catch (error) {
            console.error("❌ Connection failed!");
        }
    }

    else{
        console.log("Usage: npx component-io get <id>");
    }
};

RUN(); 
