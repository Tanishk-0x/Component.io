
// Funtion to parse the data 
export const ParseComponentData = ( code: string ) => {
    const titleMatch = code.match(/\/\/\s*Title:\s*(.+)/i) ; 
    const categoryMatch = code.match(/\/\/\s*Category:\s*(.+)/i) ; 

    const title = titleMatch ? titleMatch[1].trim() : "Untitled Component" ; 
    const category = categoryMatch ? categoryMatch[1].trim() : "Uncategorized" ; 

    const cleanCode = code
        .replace(/^\s*\/\/\s*(Title|Category):\s*.+\n?/gim, '')
        .trim() ; 

    return { 
        title , 
        category , 
        cleanCode 
    }; 
}; 