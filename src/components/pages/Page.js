import React from 'react'

export default function Page({
    content
}) {
    return <div dangerouslySetInnerHTML={{ __html: content }}/>
}
