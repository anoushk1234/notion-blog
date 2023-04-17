import React from 'react'

const BioLinks = () => {
  return (
    <>
      <div className="bio-links">
        <hr />
        <a href="https://twitter.com/anoushk77" target="_blank">
          Twitter
        </a>{' '}
        ·{' '}
        <a href="https://github.com/anoushk1234" target="_blank">
          GitHub
        </a>{' '}
        ·{' '}
        <a href="https://anoushk.medium.com" target="_blank">
          Medium
        </a>{' '}
        ·{' '}
        <a href="mailto:kharangateanoushk04@gmail.com" target="_blank">
          Mail
        </a>
        <small
          style={{
            display: 'block',
            marginTop: '8rem',
            marginLeft: '-1rem',
            fontSize: '80%',
          }}
        >
          <footer>
            <abbr title="This site and all its content are licensed under a Creative Commons Attribution-NonCommercial 4.0 International License.">
              CC BY-NC 4.0
            </abbr>
            {` ${new Date().getFullYear()} © Anoushk Kharangate.`}
          </footer>
        </small>
      </div>
    </>
  )
}

export default BioLinks
