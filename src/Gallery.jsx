import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useGlobalContext } from './context'
const url = `https://api.unsplash.com/search/photos?client_id=${
  import.meta.env.VITE_API_KEY
}`

const Gallery = () => {
  const { searchTerm, setSearchTerm } = useGlobalContext()
  const {
    data: results,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['images', searchTerm],
    queryFn: async () => {
      const result = await axios.get(`${url}&query=${searchTerm}`)
      return result.data.results
    },
  })
  if (isLoading) {
    return (
      <section className="image-container">
        <h4>Loading...</h4>
      </section>
    )
  }
  if (isError) {
    return (
      <section className="image-container">
        <h4>There was an error...</h4>
      </section>
    )
  }

  if (results.length < 1) {
    return (
      <section className="image-container">
        <h4>No results found...</h4>
      </section>
    )
  }
  return (
    <section className="image-container">
      {results.map((item) => {
        const { id, alt_description, urls } = item
        const url = urls?.regular
        return <img src={url} key={id} alt={alt_description} className="img" />
      })}
    </section>
  )
}
export default Gallery
