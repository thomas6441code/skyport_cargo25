import React, { useState } from 'react';

const TestimonialSection = () => {
    // Testimonial data with images
    const testimonials = [
        {
            id: 1,
            name: 'Sarah Johnson',
            role: 'Logistics Manager, TechCorp',
            content: 'The shipping tracking system saved us countless hours. Real-time updates helped us optimize our supply chain like never before.',
            rating: 5,
            image: 'https://randomuser.me/api/portraits/women/44.jpg',
        },
        {
            id: 2,
            name: 'Michael Chen',
            role: 'Operations Director, GlobalGoods',
            content: 'Their logistics platform reduced our delivery times by 30%. The customer support is exceptional too!',
            rating: 4,
            image: 'https://randomuser.me/api/portraits/men/32.jpg',
        },
        {
            id: 3,
            name: 'David Wilson',
            role: 'CEO, EcoShip',
            content: 'We switched to their service last year and our customer satisfaction scores have never been higher. Highly recommended!',
            rating: 5,
            image: 'https://randomuser.me/api/portraits/men/75.jpg',
        },
        {
            id: 4,
            name: 'Emma Rodriguez',
            role: 'Supply Chain Specialist',
            content: 'The analytics dashboard gives us insights we never had before. Game changer for our international shipments.',
            rating: 5,
            image: 'https://randomuser.me/api/portraits/women/63.jpg',
        },
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    const nextTestimonial = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
        );
    };

    const prevTestimonial = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
        );
    };

    // Display 3 testimonials at a time on larger screens
    const visibleTestimonials = [];
    for (let i = 0; i < 3; i++) {
        const index = (currentIndex + i) % testimonials.length;
        visibleTestimonials.push(testimonials[index]);
    }

    return (
        <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">What Our Clients Say</h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Trusted by logistics professionals worldwide
                    </p>
                </div>

                {/* Testimonial Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
                    {visibleTestimonials.map((testimonial) => (
                        <div
                            key={testimonial.id}
                            className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
                        >
                            <div className="flex items-center mb-6">
                                <img
                                    src={testimonial.image}
                                    alt={testimonial.name}
                                    className="w-16 h-16 rounded-full object-cover mr-4 border-2 border-indigo-100"
                                />
                                <div>
                                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                                </div>
                            </div>
                            <p className="text-gray-700 mb-4 italic">"{testimonial.content}"</p>
                            <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                    <svg
                                        key={i}
                                        className={`w-5 h-5 ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Navigation Controls */}
                <div className="flex justify-center space-x-4">
                    <button
                        onClick={prevTestimonial}
                        className="p-2 rounded-full bg-white shadow-md hover:bg-gray-100 transition-colors"
                        aria-label="Previous testimonial"
                    >
                        <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <div className="flex space-x-2">
                        {testimonials.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentIndex(index)}
                                className={`w-3 h-3 rounded-full ${currentIndex === index ? 'bg-indigo-600' : 'bg-gray-300'}`}
                                aria-label={`Go to testimonial ${index + 1}`}
                            />
                        ))}
                    </div>
                    <button
                        onClick={nextTestimonial}
                        className="p-2 rounded-full bg-white shadow-md hover:bg-gray-100 transition-colors"
                        aria-label="Next testimonial"
                    >
                        <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
            </div>
        </section>
    );
};

export default TestimonialSection;
