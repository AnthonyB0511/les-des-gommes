import { Title } from "../../components/utils/Title";
import { Line } from "../../components/utils/Line";
import Talk from "./Talk/Talk";

export default function Discussion() {
    return (
        <main>
            <Title title="Discussion" />
            <Line />
            {/* {user ? ( */}
            <Talk />
            {/* // ) : ( */}
            <>
                <p> Vous devez être connecter pour poster un message  </p>
                <Line />
            </>

            {/* // )} */}

        </main>
    );
}
