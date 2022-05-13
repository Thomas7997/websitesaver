import React from 'react'
import { Link } from 'react-router-dom'

export default function Website({
    link,
    url,
    addedAt,
    description
}) {
  return (
    <div className="card mb-2">
        <div className="card-body">
            <h5 className="card-title">{url}</h5>
            <h6 className="card-subtitle mb-2 text-muted">{addedAt}</h6>
            <p className="card-text">{description}</p>
            <Link href={link} className="card-link">Visit</Link>
        </div>
    </div>
  );
}
