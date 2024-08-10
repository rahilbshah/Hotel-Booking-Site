import { useEffect, useState } from "react";
import axios from "axios";

const useFetch = (url,url2,url3) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [data2,setData2]=useState([])
  const [data3,setData3]=useState([])

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(url);
        const res2= await axios.get(url2)
        const res3= await axios.get(url3)
        setData(res.data);
        setData2(res2.data)
        setData3(res3.data)
      } catch (err) {
        setError(err);
      }
      setLoading(false);
    };
    fetchData();
  }, [url,url2,url3]);

  const reFetch = async () => {
    setLoading(true);
    try {
      const res = await axios.get(url);
      const res2= await axios.get(url2)
      const res3= await axios.get(url3)
      setData(res.data);
      setData2(res2.data)
      setData3(res3.data)
    } catch (err) {
      setError(err);
    }
    setLoading(false);
  };

  return { data, loading, error, reFetch,data2,data3 };
};

export default useFetch;