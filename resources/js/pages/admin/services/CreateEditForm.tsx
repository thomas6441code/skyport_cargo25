import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';
import { TextInput } from '@/components/Form/TextInput';
import { Textarea } from '@/components/Form/TextArea';
import { Button } from '@/components/ui/button';
import { Plus, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface ServiceFormProps {
    service?: {
        id?: number;
        title: string;
        image: string;
        description: string;
        long_description: string;
        features: string[];
        benefits: string[];
        process_steps: string[];
        status?: 'active' | 'draft';
        featured?: boolean;
    };
}

const ServiceForm: React.FC<ServiceFormProps> = ({ service }) => {
    const { data, setData, post, put, processing, errors } = useForm({
        title: service?.title || '',
        image: service?.image || '',
        description: service?.description || '',
        long_description: service?.long_description || '',
        features: service?.features || [''],
        benefits: service?.benefits || [''],
        process_steps: service?.process_steps || [''],
        status: service?.status || 'draft',
        featured: service?.featured || false,
    });

    const [expandedSections, setExpandedSections] = useState({
        features: true,
        benefits: true,
        process: true,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (service?.id) {
            put(route('admin.services.update', service.id));
        } else {
            post(route('admin.services.store'));
        }
    };

    const addField = (field: 'features' | 'benefits' | 'process_steps') => {
        setData(field, [...data[field], '']);
    };

    const removeField = (field: 'features' | 'benefits' | 'process_steps', index: number) => {
        const newFields = [...data[field]];
        newFields.splice(index, 1);
        setData(field, newFields);
    };

    const handleFieldChange = (field: 'features' | 'benefits' | 'process_steps', index: number, value: string) => {
        const newFields = [...data[field]];
        newFields[index] = value;
        setData(field, newFields);
    };

    const toggleSection = (section: keyof typeof expandedSections) => {
        setExpandedSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };

    const moveItem = (field: 'features' | 'benefits' | 'process_steps', index: number, direction: 'up' | 'down') => {
        const newFields = [...data[field]];
        if (direction === 'up' && index > 0) {
            [newFields[index], newFields[index - 1]] = [newFields[index - 1], newFields[index]];
        } else if (direction === 'down' && index < newFields.length - 1) {
            [newFields[index], newFields[index + 1]] = [newFields[index + 1], newFields[index]];
        }
        setData(field, newFields);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 bg-white">
            <Card className='bg-white text-black'>
                <CardHeader>
                    <CardTitle className='text-black'>Basic Information</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-6 bg-wite">
                    <TextInput
                        label="Service Title"
                        value={data.title}
                        onChange={(e) => setData('title', e.target.value)}
                        error={errors.title}
                        required

                    />

                    <TextInput
                        label="Image URL"
                        value={data.image}
                        onChange={(e) => setData('image', e.target.value)}
                        error={errors.image}
                        required
                        placeholder="https://example.com/image.jpg"
                    />

                    {data.image && (
                        <div className="flex justify-center">
                            <img
                                src={data.image}
                                alt="Service preview"
                                className="h-40 rounded-lg object-cover border"
                                onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.src = 'https://placehold.co/400x200?text=Image+URL+Invalid';
                                }}
                            />
                        </div>
                    )}

                    <Textarea
                        label="Short Description"
                        value={data.description}
                        onChange={(e) => setData('description', e.target.value)}
                        error={errors.description}
                        rows={3}
                        required
                        placeholder="A brief description that will appear in listings"
                    />

                    <Textarea
                        label="Long Description"
                        value={data.long_description}
                        onChange={(e) => setData('long_description', e.target.value)}
                        error={errors.long_description}
                        rows={5}
                        required
                        placeholder="Detailed description of the service"
                    />

                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="featured"
                                checked={data.featured}
                                onChange={(e) => setData('featured', e.target.checked)}
                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            />
                            <Label htmlFor="featured" className="ml-2">
                                Featured Service
                            </Label>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card className=" bg-wite  text-black">
                <CardHeader className="cursor-pointer" onClick={() => toggleSection('features')}>
                    <div className="flex items-center justify-between">
                        <CardTitle>Features</CardTitle>
                        {expandedSections.features ? <ChevronUp /> : <ChevronDown />}
                    </div>
                </CardHeader>
                {expandedSections.features && (
                    <CardContent className="space-y-4">
                        {data.features.map((feature, index) => (
                            <div key={index} className="flex items-center gap-2">
                                <div className="flex-1 flex gap-2">
                                    <button
                                        type="button"
                                        onClick={() => moveItem('features', index, 'up')}
                                        disabled={index === 0}
                                        className="text-gray-400 hover:text-gray-600 disabled:opacity-30"
                                    >
                                        <ChevronUp className="h-4 w-4" />
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => moveItem('features', index, 'down')}
                                        disabled={index === data.features.length - 1}
                                        className="text-gray-400 hover:text-gray-600 disabled:opacity-30"
                                    >
                                        <ChevronDown className="h-4 w-4" />
                                    </button>
                                    <Input
                                        type="text"
                                        value={feature}
                                        onChange={(e) => handleFieldChange('features', index, e.target.value)}
                                        required
                                        placeholder="Feature description"
                                    />
                                </div>
                                <button
                                    type="button"
                                    onClick={() => removeField('features', index)}
                                    className="text-red-500 hover:text-red-700"
                                >
                                    <Trash2 className="h-4 w-4" />
                                </button>
                            </div>
                        ))}
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => addField('features')}
                            className="gap-2"
                        >
                            <Plus className="h-4 w-4" />
                            Add Feature
                        </Button>
                    </CardContent>
                )}
            </Card>

            <Card className=" bg-wite  text-black">
                <CardHeader className="cursor-pointer" onClick={() => toggleSection('process')}>
                    <div className="flex items-center justify-between">
                        <CardTitle>Process Steps</CardTitle>
                        {expandedSections.process ? <ChevronUp /> : <ChevronDown />}
                    </div>
                </CardHeader>
                {expandedSections.process && (
                    <CardContent className="space-y-4">
                        {data.process_steps.map((proces, index) => (
                            <div key={index} className="flex items-center gap-2">
                                <div className="flex-1 flex gap-2">
                                    <button
                                        type="button"
                                        onClick={() => moveItem('process_steps', index, 'up')}
                                        disabled={index === 0}
                                        className="text-gray-400 hover:text-gray-600 disabled:opacity-30"
                                    >
                                        <ChevronUp className="h-4 w-4" />
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => moveItem('process_steps', index, 'down')}
                                        disabled={index === data.process_steps.length - 1}
                                        className="text-gray-400 hover:text-gray-600 disabled:opacity-30"
                                    >
                                        <ChevronDown className="h-4 w-4" />
                                    </button>
                                    <Input
                                        type="text"
                                        value={proces}
                                        onChange={(e) => handleFieldChange('process_steps', index, e.target.value)}
                                        required
                                        placeholder="Process description"
                                    />
                                </div>
                                <button
                                    type="button"
                                    onClick={() => removeField('process_steps', index)}
                                    className="text-red-500 hover:text-red-700"
                                >
                                    <Trash2 className="h-4 w-4" />
                                </button>
                            </div>
                        ))}
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => addField('process_steps')}
                            className="gap-2"
                        >
                            <Plus className="h-4 w-4" />
                            Add Process
                        </Button>
                    </CardContent>
                )}
            </Card>

            <Card className="bg-wite text-black">
                <CardHeader className="cursor-pointer" onClick={() => toggleSection('benefits')}>
                    <div className="flex items-center justify-between">
                        <CardTitle>Benefits</CardTitle>
                        {expandedSections.benefits ? <ChevronUp /> : <ChevronDown />}
                    </div>
                </CardHeader>
                {expandedSections.benefits && (
                    <CardContent className="space-y-4">
                        {data.benefits.map((feature, index) => (
                            <div key={index} className="flex items-center gap-2">
                                <div className="flex-1 flex gap-2">
                                    <button
                                        type="button"
                                        onClick={() => moveItem('benefits', index, 'up')}
                                        disabled={index === 0}
                                        className="text-gray-400 hover:text-gray-600 disabled:opacity-30"
                                    >
                                        <ChevronUp className="h-4 w-4" />
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => moveItem('benefits', index, 'down')}
                                        disabled={index === data.benefits.length - 1}
                                        className="text-gray-400 hover:text-gray-600 disabled:opacity-30"
                                    >
                                        <ChevronDown className="h-4 w-4" />
                                    </button>
                                    <Input
                                        type="text"
                                        value={feature}
                                        onChange={(e) => handleFieldChange('benefits', index, e.target.value)}
                                        required
                                        placeholder="Benefit description"
                                    />
                                </div>
                                <button
                                    type="button"
                                    onClick={() => removeField('benefits', index)}
                                    className="text-red-500 hover:text-red-700"
                                >
                                    <Trash2 className="h-4 w-4" />
                                </button>
                            </div>
                        ))}
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => addField('benefits')}
                            className="gap-2"
                        >
                            <Plus className="h-4 w-4" />
                            Add Benefits
                        </Button>
                    </CardContent>
                )}
            </Card>

            {/* Repeat similar Card structure for Benefits and Process Steps sections */}

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
                            {service?.id ? 'Updating...' : 'Creating...'}
                        </span>
                    ) : (
                        service?.id ? 'Update Service' : 'Create Service'
                    )}
                </Button>
            </div>
        </form>
    );
};

export default ServiceForm;