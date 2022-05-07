import React, { useEffect } from 'react'
import Page from './Page'
import { connect } from 'react-redux'

function View({
    title,
    content,
    success,
    isLoading
}) {
    document.title = title

    useEffect(() => {
        
    })

    return (
        <>
            <h1 className="text-center">
                {title}
            </h1>
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
    success : state.index.success
});

export default connect()(View);
