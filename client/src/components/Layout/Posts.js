import React from 'react'

function Posts(props) {
  return (
    props.token ? <div>{props.token}</div> : <div>Not Signed In</div>
  )
}

export default Posts
