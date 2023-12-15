import { useEffect, useState } from "react";
// récupère les données qui pourraient être modifiées (avec des données modifiables) et un effet de chargement tant que les donnnées ne sont pas chargées
export function useFetchData(url, way) {
    const [datas, setDatas] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        async function fetchDatas() {
            try {
                const response = await fetch(`${url}/${way}`);
                if (response.ok) {
                    const datasBack = await response.json();
                    // modification des données  avec en plsu celles du back
                    setDatas(datasBack);
                    // le loading repasse à false
                    setIsLoading(false);
                }
            } catch (error) {
                console.error(error);
            } finally {
                // le loading repasse à false quoi qu'il arrive
                setIsLoading(false);
            }
        }
        fetchDatas();
    }, [url]);
    return [[datas, setDatas], isLoading];

}