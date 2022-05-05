import React from 'react'

export default function Website({
    link,
    url,
    addedAt,
    description
}) {
  return (
    <div className="card">
        <div className="card-body">
            <h5 className="card-title">{url}</h5>
            <h6 className="card-subtitle mb-2 text-muted">{addedAt}</h6>
            <p className="card-text">{description}</p>
            <a href={link} className="card-link">Visit</a>
        </div>
    </div>
  );
}
