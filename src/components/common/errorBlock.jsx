import React from 'react';


function ErrorBlock({errors,...props}) {

    function errorsDisplay(){
        if(errors.email){
            return errors.email
        }else if (errors.name){
            return errors.name
        }else if(errors.password){
            return errors.password
        }
    }
    return (
        <div {...props}>
            <p>{errorsDisplay()}</p>
        </div>
    );
}

export default ErrorBlock;