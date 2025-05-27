export default function CtaBanner(
    {
          title = "Ready to Ship with Confidence?",
          description = "Get a free quote for your next China-Tanzania shipment",
          buttonText = "Request Quote Now",
          buttonLink = "/quote",
          variant = "primary"

    }) {

    const bgColors = {
        primary: 'bg-primary',
        secondary: 'bg-secondary',
        dark: 'bg-gray-900'
    };

    const buttonColors = {
        primary: 'bg-white text-primary hover:bg-gray-100',
        secondary: 'bg-white text-secondary hover:bg-gray-100',
        dark: 'bg-primary text-white hover:bg-primary-dark'
    };

    return (
        <div className={`${bgColors[variant] || bgColors.primary} text-white py-16`}>
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-4">{title}</h2>
                    <p className="text-xl mb-8">{description}</p>
                    <a
                        href={buttonLink}
                        className={`inline-block px-8 py-4 rounded-lg font-bold text-lg ${buttonColors[variant] || buttonColors.primary} transition-colors`}
                    >
                        {buttonText}
                    </a>
                </div>
            </div>
        </div>
    );
}
