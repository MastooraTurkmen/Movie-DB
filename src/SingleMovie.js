import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { API_ENDPOINT } from './context'

const SingleMovie = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState({
    show: false,
    msg: ''
  });

  const fetchMovie = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    if (data.Response === 'False') {
      setIsLoading(false);
      setError({ show: true, msg: data.Error })
    } else {
      setIsLoading(false);
      setMovie(data)
    }
  }

  if (isLoading) {
    return <div className="loading"></div>
  }

  if (error.show) {
    return <div className="page-error">
      <h1>{error.msg}</h1>
      <Link to='/' className='btn'>back to movies</Link>
    </div>
  }

  useEffect(() => {
    fetchMovie(`${API_ENDPOINT}&i=${id}`)
  }, [id])

  return <h2>single movie</h2>
}

export default SingleMovie
