import { useEffect, useState } from "react";

export function useFetchAdmin(url, way) {
    const [datas, setDatas] = useState([]);
    useEffect(() => {
        async function fetchDatas() {
            try {
                const response = await fetch(`${url}/${way}`);
                if (response.ok) {
                    const datasBack = await response.json();
                    setDatas(datasBack);

                }
            } catch (error) {
                console.error(error);
            }
        }
        fetchDatas();
    }, []);
    return datas;

}