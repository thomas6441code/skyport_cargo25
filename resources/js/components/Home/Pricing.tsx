import { FC, useState } from 'react';
import { Check, X, Truck, Plane, Ship, Package } from 'lucide-react';

interface PricingPlan {
    id: string;
    title: string;
    description: string;
    priceMonthly: number;
    priceYearly: number;
    features: string[];
    cta: string;
    popular?: boolean;
    icon: JSX.Element;
}

const Pricing: FC = () => {
    const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
    const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

    const pricingPlans: PricingPlan[] = [
        {
            id: 'basic',
            title: 'Basic Freight',
            description: 'Essential logistics for small businesses',
            priceMonthly: 299,
            priceYearly: 2990,
            features: [
                'Air freight (up to 50kg)',
                'Basic tracking',
                'Email support',
                '3-day delivery'
            ],
            cta: 'Start with Basic',
            icon: <Package className="w-6 h-6" />
        },
        {
            id: 'standard',
            title: 'Standard Logistics',
            description: 'Complete solution for growing businesses',
            priceMonthly: 599,
            priceYearly: 5990,
            features: [
                'Air & ocean freight',
                'Real-time tracking',
                'Priority support',
                'Customs clearance',
                '2-day delivery'
            ],
            cta: 'Choose Standard',
            popular: true,
            icon: <Truck className="w-6 h-6" />
        },
        {
            id: 'enterprise',
            title: 'Enterprise Suite',
            description: 'Premium global logistics network',
            priceMonthly: 999,
            priceYearly: 9990,
            features: [
                'Multi-modal transport',
                'Dedicated account manager',
                '24/7 VIP support',
                'Warehousing included',
                'Same-day dispatch',
                'Custom solutions'
            ],
            cta: 'Contact Sales',
            icon: <Ship className="w-6 h-6" />
        }
    ];

    return (
        <section id="pricing" className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-3">Flexible Pricing Plans</h2>
                    <div className="w-16 h-1 bg-sky-500 mx-auto mb-4"></div>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Choose the perfect logistics solution for your business needs
                    </p>

                    {/* Billing Toggle */}
                    <div className="flex items-center justify-center mt-8">
                        <span className={`mr-4 font-medium ${billingCycle === 'monthly' ? 'text-gray-900' : 'text-gray-500'}`}>
                            Monthly
                        </span>
                        <button
                            type="button"
                            className="relative inline-flex h-6 w-11 items-center rounded-full bg-sky-600 transition-colors"
                            onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
                        >
                            <span
                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${billingCycle === 'monthly' ? 'translate-x-1' : 'translate-x-6'
                                    }`}
                            />
                        </button>
                        <span className={`ml-4 font-medium ${billingCycle === 'yearly' ? 'text-gray-900' : 'text-gray-500'}`}>
                            Yearly <span className="text-sky-600">(Save 15%)</span>
                        </span>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {pricingPlans.map((plan) => (
                        <div
                            key={plan.id}
                            className={`relative rounded-xl border-2 transition-all hover:shadow-lg ${plan.popular
                                    ? 'border-sky-500 bg-white shadow-md scale-105'
                                    : 'border-gray-200 bg-white'
                                }`}
                            onClick={() => setSelectedPlan(plan.id)}
                        >
                            {plan.popular && (
                                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-sky-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                                    Most Popular
                                </div>
                            )}

                            <div className="p-6">
                                <div className="flex items-center mb-4">
                                    <div className="bg-sky-100 p-2 rounded-lg mr-3 text-sky-600">
                                        {plan.icon}
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900">{plan.title}</h3>
                                </div>
                                <p className="text-gray-600 mb-5">{plan.description}</p>

                                <div className="mb-6">
                                    <span className="text-4xl font-bold text-gray-900">
                                        ${billingCycle === 'monthly' ? plan.priceMonthly : plan.priceYearly}
                                    </span>
                                    <span className="text-gray-500">
                                        /{billingCycle === 'monthly' ? 'month' : 'year'}
                                    </span>
                                </div>

                                <ul className="space-y-3 mb-8">
                                    {plan.features.map((feature, index) => (
                                        <li key={index} className="flex items-start">
                                            <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                                            <span className="text-gray-700">{feature}</span>
                                        </li>
                                    ))}
                                    {plan.id === 'basic' && (
                                        <li className="flex items-start text-gray-400">
                                            <X className="h-5 w-5 text-gray-300 mr-2 flex-shrink-0" />
                                            <span>Customs clearance</span>
                                        </li>
                                    )}
                                </ul>

                                <button
                                    className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${plan.popular
                                            ? 'bg-sky-600 text-white hover:bg-sky-700'
                                            : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                                        }`}
                                >
                                    {plan.cta}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Enterprise Custom Solution Note */}
                <div className="mt-12 text-center text-gray-600 max-w-2xl mx-auto">
                    <p>
                        Need a custom solution? Our enterprise team can create a tailored logistics package
                        for your specific business requirements. <a href="/contact" className="text-sky-600 hover:underline">Contact us</a> for details.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Pricing;
