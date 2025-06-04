import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';
import { TextInput } from '@/components/Form/TextInput';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

interface OfficeProps {
    office?: {
        id: number;
        coordinates: [number, number];
        country: string;
        city: string;
        address?: string;
        email?: string;
        phone?: string;
        hours?: string;
        color?: string;
    }
}

const OfficeForm: React.FC<OfficeProps> = ({ office }) => {
    const { data, setData, post, put, processing, errors } = useForm({
        country: office?.country || '',
        city: office?.city || '',
        address: office?.address || '',
        email: office?.email || '',
        phone: office?.phone || '',
        coordinates: office?.coordinates || [0, 0],
        hours: office?.hours || '',
        color: office?.color || '',
    });

    const [expandedSections, setExpandedSections] = useState({
        coordinates: true,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (office?.id) {
            put(route('admin.offices.update', office.id));
        } else {
            post(route('admin.offices.store'));
        }
    };

    const handleFieldChange = (index: number, value: number) => {
        const newFields = [...data.coordinates];
        newFields[index] = value;
        setData(prev => ({ ...prev, coordinates: newFields }));
    };

    const toggleSection = (section: keyof typeof expandedSections) => {
        setExpandedSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 bg-white">
            <Card className='bg-white text-black'>
                <CardHeader>
                    <CardTitle className='text-black'>Basic Offices Information</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-6 bg-wite">
                    <TextInput
                        label="Country Title"
                        value={data.country}
                        onChange={(e) => setData('country', e.target.value)}
                        error={errors.country}
                        required

                    />

                    <TextInput
                        label="City Title"
                        value={data.city}
                        onChange={(e) => setData('city', e.target.value)}
                        error={errors.city}
                        required

                    />

                    <TextInput
                        label="Address"
                        value={data.address}
                        onChange={(e) => setData('address', e.target.value)}
                        error={errors.address}
                        required

                    />

                    <TextInput
                        label="Email"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        error={errors.email}
                        required

                    />
                    <TextInput
                        label="Phone"
                        value={data.phone}
                        onChange={(e) => setData('phone', e.target.value)}
                        error={errors.phone}
                        required

                    />
                    <TextInput
                        label="Work Hours"
                        value={data.hours}
                        onChange={(e) => setData('hours', e.target.value)}
                        error={errors.hours}
                        required

                    />
                    <TextInput
                        label="Color"
                        value={data.color}
                        onChange={(e) => setData('color', e.target.value)}
                        error={errors.color}
                        required
                        placeholder='Eq.(#3BADE2)'

                    />

                </CardContent>
            </Card>

            <Card className=" bg-wite  text-black">
                <CardHeader className="cursor-pointer" onClick={() => toggleSection('coordinates')}>
                    <div className="flex items-center justify-between">
                        <CardTitle>coordinates</CardTitle>
                        {expandedSections.coordinates ? <ChevronUp /> : <ChevronDown />}
                    </div>
                </CardHeader>
                {expandedSections.coordinates && (
                    <CardContent className="space-y-4">
                        <div className="flex-col items-center gap-2">
                            <div className="flex-1 flex gap-2">
                                <Input
                                    type="number"
                                    step="any"
                                    value={data.coordinates[0]}
                                    onChange={(e) => handleFieldChange(0, parseFloat(e.target.value))}
                                    required
                                    placeholder="Latitude Coordinates"
                                />
                            </div>
                            {(errors as Record<string, string>)['coordinates.0'] && (
                                <p className="text-sm text-red-600">{(errors as Record<string, string>)['coordinates.0']}</p>
                            )}
                        </div>
                        <div className="flex-col items-center gap-2">
                            <div className="flex-1 flex gap-2">
                                <Input
                                    type="number"
                                    step="any"
                                    value={data.coordinates[1]}
                                    onChange={(e) => handleFieldChange(1, parseFloat(e.target.value))}
                                    required
                                    placeholder="Longitude Coordinates"
                                />
                            </div>
                            {(errors as Record<string, string>)['coordinates.1'] && (
                                <p className="text-sm text-red-600">{(errors as Record<string, string>)['coordinates.1']}</p>
                            )}
                        </div>
                    </CardContent>
                )}
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
                            {office?.id ? 'Updating...' : 'Creating...'}
                        </span>
                    ) : (
                        office?.id ? 'Update Offices' : 'Create Offices'
                    )}
                </Button>
            </div>
        </form>
    );
};

export default OfficeForm;