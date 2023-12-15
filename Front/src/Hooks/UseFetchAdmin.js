import { useEffect, useState } from "react";
// hook personnalisé qui récupère une donnée qui n'est aps censé être modifié par exemple la liste des messages.
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