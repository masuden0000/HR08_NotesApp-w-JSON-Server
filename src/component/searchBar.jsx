import React from 'react'

const searchBar = () => {
    return (
        <div className="input-group m-0 searchComponent">
            <input type="text" className="form-control" placeholder="Find your notes (Can't use)" aria-label="Recipient's username" aria-describedby="button-addon2" />
            <button className="btn btn-outline-primary" type="button" id="button-addon2">Search</button>
        </div>
    )
}

export default searchBar
