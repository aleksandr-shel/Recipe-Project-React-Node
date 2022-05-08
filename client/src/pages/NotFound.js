import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function NotFound(){

    return(
        <div className='d-flex justify-content-center align-items-center h-100 w-100'>
            <h1>Not Found</h1> 
            <Button as={Link} to='/'>
                Return to recipes page
            </Button>
        </div>
    )
}
