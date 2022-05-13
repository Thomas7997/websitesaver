import React, { useEffect } from 'react'
import Page from './Page'
import { connect } from 'react-redux'
import { get_website } from '../../actions/indexActions'
import { useParams } from 'react-router-dom'

function View({
    title,
    content,
    success,
    isLoading,
    get_website,
    match
}) {
    document.title = title
    const idC = useParams();

    useEffect(() => {
        console.log(idC.id);
        if (idC.id) get_website(idC.id);
        if (!isLoading && !success) console.log("Content not loaded.");
    }, [])

    return (
        <>
            <div className="m-5">
                <Page
                    content={content}
                />
            </div>
        </>
    )
}

const mapStateToProps = state => ({
    content : state.index.content,
    isLoading : state.index.isLoading,
    success : state.index.success,
    title : state.index.title
});

export default connect(mapStateToProps, {
    get_website
})(View);
