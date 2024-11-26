import React from 'react';
import { useNavigate } from 'react-router-dom';
export function EmptyCart(){
    const navigate = useNavigate();
    const handleBackToHome = () => {
        navigate('/'); // Navigate to the home screen
      };
    
    return(
        <div id='emptyCart'>
             <button className='btn btn-success' onClick={handleBackToHome}>Back to Home Screen</button>
        </div>
    )
}