import React from 'react';
import { useForm } from '@inertiajs/react';
import { TextInput } from '@/components/Form/TextInput';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface cargoTypeProps {
    cargoType?: {
        id: number;
        name: string;
        description: string;
    }
}

const CargoForm: React.FC<cargoTypeProps> = ({ cargoType }) => {
    const { data, setData, post, put, processing, errors } = useForm({
        name: cargoType?.name || '',
        description: cargoType?.description || '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (cargoType?.id) {
            put(route('admin.cargotypes.update', cargoType.id));
        } else {
            post(route('admin.cargotypes.store'));
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 bg-white max-w-2xl">
            <Card className='bg-white text-black max-w-2xl'>
                <CardHeader>
                    <CardTitle className='text-black'>Basic Information</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-6">
                    <TextInput
                        label="CargoType Name"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        error={errors.name}
                        required

                    />

                    <TextInput
                        label="CargoType description"
                        value={data.description}
                        onChange={(e) => setData('description', e.target.value)}
                        error={errors.description}
                        required

                    />

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
                            {cargoType?.id ? 'Updating...' : 'Creating...'}
                        </span>
                    ) : (
                        cargoType?.id ? 'Update CargoType' : 'Create CargoType'
                    )}
                </Button>
            </div>
        </form>
    );
};

export default CargoForm;