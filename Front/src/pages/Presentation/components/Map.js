const Map = () => {
    const mapEmbedURL = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2530.9868674681557!2d2.7675890765676767!3d50.6273607716265!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47dd2798425deef7%3A0x2b74c4f512a88576!2sSalle%20des%20F%C3%AAtes%20de%20Laventie!5e0!3m2!1sfr!2sfr!4v1696505459531!5m2!1sfr!2sfr";

    return (
        <div style={{ height: '350px' }}>
            <iframe
                title="Google Maps"
                width="100%"
                height="100%"
                frameBorder="0"
                style={{ border: 0 }}
                src={mapEmbedURL}
                allowFullScreen
            ></iframe>
        </div>
    );
};

export default Map;