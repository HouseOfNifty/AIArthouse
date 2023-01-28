import { useEffect, useState } from "react";
import axios from 'axios';

export default function useImageSearch(query, _id, URL) {
    
    const [loading, setLoading] = useState(true)
    const [images, setImages] = useState([])
    const [hasMore, setHasMore] = useState(false)

    useEffect(() => {
        setImages([])
    }, [query])

    useEffect(() => {

        setLoading(true)
        //fetch shit
        //backend has to send in pages

        let cancel


            axios({
                method: 'GET',
                url: URL,
                params: { id: _id },
                cancelToken: new axios.CancelToken(c => cancel = c)
            }).then(res => {
                
                if (res.data.length > 0) {
                    setHasMore(true);
                    setImages(prevImages => {
                        return [...new Set([...prevImages, ...res.data])]
                    }
                    )
                }
                else{
                    setHasMore(false);
                }
                setLoading(false);
            })
        


        return () => cancel()


    }, [query, _id])
    return { images, hasMore, loading }
}