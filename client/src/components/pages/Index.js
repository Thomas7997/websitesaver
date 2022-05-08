import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import {
    list_websites
} from '../../actions/indexActions';
import {
    Link
} from "react-router-dom"

// Website component
import Website from '../Website';

function Index({
    success,
    isLoading,
    websites,
    list_websites
}) {
    useEffect(() => {
        list_websites()
        console.log(success, isLoading, websites);
    }, []);

    return (
        <>
            <div className="m-2">
                <Link to="/save">
                    <button className="btn btn-primary">Ajouter</button>
                </Link>
            </div>
            <h1 className="text-center p-1">
                Websites
            </h1>
            <div className="m-3">
                {
                    websites.map((w,index) => (
                        <Website
                            key={index}
                            link={`/website/${w.Id_website}`}
                            url={w.url}
                            addedAt={w.addedAt}
                            description="A cool website !"
                        />
                    ))
                }
            </div>
        </>
    )
}

const mapStateToProps = state => ({
    success : state.index.success,
    isLoading : state.index.isLoading,
    websites : state.index.websites
})

export default connect(mapStateToProps, {
    list_websites
})(Index);
