import { useEffect, useState } from 'react'

const useImage = (imageSrc) => {
  const [image, setImage] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const getImage = async () => {
        try {
            const response = await import(`../images/${imageSrc}`)
            setImage(response.default)
        } catch (err) {
            setError(err)
        } finally {
            setLoading(false)
        }
    }
    getImage()
  }, [imageSrc])

  return {
      image,
      loading,
      error,
  }
}

export default useImage
