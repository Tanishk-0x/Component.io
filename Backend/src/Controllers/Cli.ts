import { Request , Response } from "express";
import Component from "../Models/componentModel";


const GetComponentForCLI = async(req: Request , res: Response) => {
    try {
        const { id } = req.params ; 

        if( !id ){
            return res.status(403).json({
                success: false , 
                message: 'Component ID Missing!'
            }); 
        }

        const component = await Component.findById( id ).lean();  

        if( !component ){
            return res.status(404).json({
                success: false , 
                message: 'Component Not Found!'
            }); 
        }

        const code = component.code ; 

        // Extracting FileName 
        const match = code.match(/(?:export\s+default\s+function|const|function)\s+([A-Z][a-zA-Z0-9_]*)/);
        const componentName = (match && match[1]) ? match[1] : `Component_${id.slice(-4)}`;

        return res.status(200).json({
            success: true , 
            message: 'Component Fetched SuccessFully (CLI)!' , 
            fileName: `${componentName}.jsx` , 
            code: code ,
        });
    }
    
    catch (error) {
        return res.status(500).json({
            success: false , 
            message: 'Error While Fetching Component'
        }); 
    }
}


export default GetComponentForCLI ; 