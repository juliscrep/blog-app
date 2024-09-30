import React from 'react'


const page = ({ params }) => {
    params: {
        id: String
    }
  return (
    <div>page: {params.id}</div>
  )
}

export default page