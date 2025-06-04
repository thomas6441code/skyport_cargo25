import { useState, useEffect } from 'react';

interface Testimonial {
    'id': number;
    'name': string;
    'role': string;
    'content': string;
    'rating': number;
    'image': string;
};


const TestimonialSection = ({ testimonials }: { testimonials: Testimonial[] }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Auto-rotate testimonials every 5 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) =>
                prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
            );
        }, 3000);

        return () => clearInterval(interval);
    }, [testimonials.length]);

    // Display 3 testimonials at a time on larger screens
    const visibleTestimonials = [];
    for (let i = 0; i < 3; i++) {
        const index = (currentIndex + i) % testimonials.length;
        visibleTestimonials.push(testimonials[index]);
    }

    // Handle dot navigation
    const goToTestimonial = (index: number) => {
        setCurrentIndex(index);
    };


    return (

        <div className="container mx-auto px-4">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">What Our Clients Say</h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    Trusted by logistics professionals worldwide
                </p>
            </div>

            {visibleTestimonials &&
                <>
                    {/* Testimonial Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
                        {visibleTestimonials?.map((testimonial) => (
                            <div
                                key={testimonial?.id}
                                className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                            >
                                <div className="flex items-center mb-6">
                                    <img
                                        src={testimonial?.image}
                                        alt={testimonial?.name}
                                        className="w-16 h-16 rounded-full object-cover mr-4 border-2 border-indigo-100"
                                    />
                                    <div>
                                        <h4 className="font-semibold text-gray-900">{testimonial?.name}</h4>
                                        <p className="text-sm text-gray-600">{testimonial?.role}</p>
                                    </div>
                                </div>
                                <p className="text-gray-700 mb-4 italic">"{testimonial?.content}"</p>
                                <div className="flex">
                                    {[...Array(5)].map((_, i) => (
                                        <svg
                                            key={i}
                                            className={`w-5 h-5 ${i < testimonial?.rating ? 'text-yellow-400' : 'text-gray-300'}`}
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
                </>

            }

            {/* Dot Navigation Only */}
            <div id="question" className="flex justify-center space-x-2">
                {testimonials.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToTestimonial(index)}
                        className={`w-3 h-3 rounded-full transition-colors duration-300 ${currentIndex === index ? 'bg-indigo-600 w-6' : 'bg-gray-300'
                            }`}
                        aria-label={`Go to testimonial ${index + 1}`}
                    />
                ))}
            </div>


        </div>

    );
};

export default TestimonialSection;
