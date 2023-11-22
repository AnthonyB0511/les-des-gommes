const API_PROFILE = "/api/profile";

export async function getDefaultImage({ blobby, idUser }) {

    try {
        let response;

        if (blobby) {
            response = await fetch(
                `${API_PROFILE}/getAvatarFromUser?id=${idUser}`
            );
        } else {
            response = await fetch(
                `${API_PROFILE}/getDefaultImage`
            );
        }
        if (!response.ok) {
            throw new Error("Erreur lors de la récupération de l'image");
        }

        const imgDefaultFromBack = await response.json();
        const uint8Array = new Uint8Array(imgDefaultFromBack.blobby.data);
        const blob = new Blob([uint8Array]);
        const urlImage = URL.createObjectURL(blob);
        fetch(urlImage)
            .then((response) => response.text())
            .then((text) => {
                return text;
            }); // Renvoyer l'URL de l'image
    } catch (error) {
        console.error("Erreur lors de la récupération de l'image :", error);
        throw error;
    }
}

