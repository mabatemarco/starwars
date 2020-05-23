import React from 'react';
import Characters from './Characters'

export default function Crawl(props) {
  return (
    <div className='crawl'>
      <h1>Crawl</h1>
      <p>{props.movieCrawl}</p>
      <Characters
        characters={props.characters}
      />
    </div>
  )
}
