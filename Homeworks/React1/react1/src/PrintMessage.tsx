
interface Props {
    message : string;
}

function PrintMessage ({message}:Props){

    return (<>
    
        <h1>{message}</h1>
    
    </>
    )

}

export default PrintMessage;