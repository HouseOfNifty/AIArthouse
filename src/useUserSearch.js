import { useEffect, useState } from "react";
import axios from 'axios';


export default function useUserSearch(_userId, _id, URL){
    
    const [loading, setLoading] = useState(true)
    const [images, setImages] = useState([])
    const [hasMore, setHasMore] = useState(false)

    useEffect(() => {
        setImages([])
    }, [_userId])

    useEffect(() => {

        setLoading(true);


        let cancel;


            axios({
                method: 'GET',
                url: URL,
                params: { userId: _userId,
                            id: _id },
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


    }, [_userId, _id])
    return { images, hasMore, loading }
}