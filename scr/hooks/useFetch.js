import React, {useEffect, useState} from 'react';
import axios from "axios";

const UseFetch = (url) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    console.log(url)

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const res = await axios.get(url);
                setData(res.data)
            } catch (e) {
                setError(e)
            }
            setLoading(false)
        }
    },[url]);

    const reFetch = async () => {
        setLoading(true);
        try {
            const res = await axios.get(url);
            setData(res.data)
        } catch (e) {
            setError(e)
        }
        setLoading(false)
    }

    return {data, loading, error, reFetch};
};
export default UseFetch;