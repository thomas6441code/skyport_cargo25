import MainLayout from '@/Layouts/MainLayout';
import FaqAccordion from '@/Components/Faq/FaqAccordion';
import FaqCategories from '@/Components/Faq/FaqCategories';

export default function FaqPage() {
    const faqs = [
        {
            category: 'Shipping',
            questions: [
                {
                    question: 'What is the transit time for air freight from China to Tanzania?',
                    answer: 'Our standard air freight service takes 2-3 days from Shanghai to Dar es Salaam. Express options are available for 24-48 hour delivery.'
                },
                {
                    question: 'What types of cargo can you transport?',
                    answer: 'We handle general cargo, electronics, textiles, perishables (with temperature control), and more. Restricted items include hazardous materials and prohibited goods.'
                }
            ]
        },
        {
            category: 'Customs',
            questions: [
                {
                    question: 'Do you handle customs clearance in Tanzania?',
                    answer: 'Yes, we provide complete customs brokerage services including documentation preparation, duty payment, and clearance coordination.'
                }
            ]
        }
    ];

    return (
        <MainLayout>
            <div className="bg-white py-16">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Find answers to common questions about our China-Tanzania air freight services
                        </p>
                    </div>

                    <div className="max-w-4xl mx-auto">
                        <FaqCategories
                            categories={faqs.map(faq => faq.category)}
                            className="mb-8"
                        />

                        {faqs.map((category, index) => (
                            <div key={index} className="mb-12">
                                <h2 className="text-2xl font-bold mb-6">{category.category}</h2>
                                <FaqAccordion
                                    items={category.questions}
                                />
                            </div>
                        ))}

                        <div className="bg-blue-50 p-6 rounded-lg">
                            <h3 className="font-bold text-lg mb-3">Still have questions?</h3>
                            <p className="mb-4">Our logistics experts are available 24/7 to assist you.</p>
                            <a
                                href="/contact"
                                className="inline-block bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark"
                            >
                                Contact Support
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
