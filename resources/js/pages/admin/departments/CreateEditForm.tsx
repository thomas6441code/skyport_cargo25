import React from 'react';
import { useForm } from '@inertiajs/react';
import { TextInput } from '@/components/Form/TextInput';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface DepartmentProps {
    department?: {
        id: number;
        name: string;
        description: string;
    }
}

const DepartmentForm: React.FC<DepartmentProps> = ({ department }) => {
    const { data, setData, post, put, processing, errors } = useForm({
        name: department?.name || '',
        description: department?.description || '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (department?.id) {
            put(route('admin.departments.update', department.id));
        } else {
            post(route('admin.departments.store'));
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 bg-white max-w-2xl">
            <Card className='bg-white text-black max-w-2xl'>
                <CardHeader>
                    <CardTitle className='text-black'>Basic Department Information</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-6">
                    <TextInput
                        label="Department Name"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        error={errors.name}
                        required

                    />

                    <TextInput
                        label="Department description"
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
                            {department?.id ? 'Updating...' : 'Creating...'}
                        </span>
                    ) : (
                        department?.id ? 'Update Department' : 'Create Department'
                    )}
                </Button>
            </div>
        </form>
    );
};

export default DepartmentForm;