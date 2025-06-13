import React from 'react';
import { useForm } from '@inertiajs/react';
import { Textarea } from '@/components/Form/TextArea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { OptionIcon } from 'lucide-react';

interface faq {
    id?: number;
    question: string;
    answer: string;
    category: string;
};


interface service {
    id: number;
    title: string;
};

interface FaqsFormProps {

    service: service[];
    faq: faq;

}

const FaqForm: React.FC<FaqsFormProps> = ({ faq, service }) => {
    const { data, setData, post, put, processing, errors } = useForm({
        question: faq?.question || '',
        answer: faq?.answer || '',
        category: faq?.category || '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (faq?.id) {
            put(route('admin.faqs.update', faq.id));
        } else {
            post(route('admin.faqs.store'));
        }
    };


    return (
        <form onSubmit={handleSubmit} className="space-y-6 bg-white">
            <Card className='bg-white text-black'>
                <CardHeader>
                    <CardTitle className='text-black'>Faq`s Information</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-6 bg-wite">

                    <Textarea
                        label="Question *"
                        value={data.question}
                        onChange={(e) => setData('question', e.target.value)}
                        error={errors.question}
                        rows={3}
                        required
                        placeholder="A brief question that will appear in listings"
                    />

                    <Textarea
                        label="Answer *"
                        value={data.answer}
                        onChange={(e) => setData('answer', e.target.value)}
                        error={errors.answer}
                        rows={5}
                        required
                        placeholder="Detailed answer of the question"
                    />

                    <label className="block text-sm text-gray-700 mb-1">Category *</label>
                    <div className="relative">
                        <OptionIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <select
                            className={`w-full pl-10 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-200 ${errors?.category
                                ? 'border-red-500'
                                : 'border-gray-300'
                                }`}
                            value={data.category || ''}
                            onChange={(e) => setData({ ...data, category: e.target.value })}
                        >
                            <option value="">Select a category</option>
                            <option value="0">Tracking Faq</option>
                            {service.map((dept) => (
                                <option key={dept.id} value={dept.id}>{dept.title} Faq</option>
                            ))}
                        </select>
                    </div>


                </CardContent>
            </Card>

            <div className="flex justify-end gap-4">
                <Button
                    type="button"
                    variant="outline"
                    className='bg-gray-300 hover:bg-gray-400 text-black'
                    onClick={() => window.history.back()}
                >
                    Cancel
                </Button>
                <Button type="submit" className='bg-blue-700 hover:bg-blue-600 text-white' disabled={processing}>
                    {processing ? (
                        <span className="flex items-center">
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            {faq?.id ? 'Updating...' : 'Creating...'}
                        </span>
                    ) : (
                        faq?.id ? 'Update Faq' : 'Create Faq'
                    )}
                </Button>
            </div>
        </form>
    );
};

export default FaqForm;