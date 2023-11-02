import { useEffect, useState } from "react";

export function useFetchData(url, way) {
    const [datas, setDatas] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        async function fetchDatas() {
            try {
                const response = await fetch(`${url}/${way}`);
                if (response.ok) {
                    const datasBack = await response.json();
                    setDatas(datasBack);
                    setIsLoading(false);
                }
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        }
        fetchDatas();
    }, [url]);
    return [[datas, setDatas], isLoading];

}