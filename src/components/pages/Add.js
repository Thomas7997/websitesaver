import React, { useState, useEffect } from 'react'
import {
    save_website
} from '../../actions/indexActions'
import { connect } from 'react-redux';

function Add({
    success, isLoading, save_website
}) {
    const [url, setUrl] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [addedSuccessfully, setAddedSuccessfully] = useState(null);
    useEffect(() => {
        if (!isLoading && success) setAddedSuccessfully(true);   
        else if (!isLoading) {
            setAddedSuccessfully(false);
            setErrorMsg("An error occured while trying to add the website.");
        }
    }, [save_website, success, addedSuccessfully])

    function onSubmit (e) {
        e.preventDefault();

        if (url) save_website(url)
        else setErrorMsg("No url.");
    }

    return (
        <>
            {
                addedSuccessfully ? (
                    <div className="alert alert-success" role="alert">
                        Le site web a été enregistré et est en cours de téléchargement.
                    </div>
                ) : null
            }
            <h1 className="text-center">Saving a website</h1>
            <div className='container m-5'>
                <form onSubmit={onSubmit}>
                    <div className="m-2">
                        <input className="form-control" type="text" value={url} onChange={e => setUrl(e.target.value)} />
                    </div>
                    <div className="m-2">
                        <button className="btn btn-primary" type="submit">
                            Save
                        </button>
                    </div>
                    {
                        errorMsg ? (
                            <p className="m-2">{errorMsg}</p>
                        ) : null
                    }
                </form>
            </div>
        </>
    )
}

const mapStateToProps = state => ({
    success : state.index.success,
    isLoading : state.index.isLoading
})

export default connect(mapStateToProps, {
    save_website
})(Add);
