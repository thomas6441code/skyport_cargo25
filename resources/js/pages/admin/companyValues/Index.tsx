import { Head, useForm, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { Pencil, Trash2, Plus, ChevronUp, ChevronDown } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';

type CompanyValue = {
    id: number;
    type: 'mission' | 'vision' | 'value';
    title?: string;
    content: string;
    sort_order: number;
};

type PageProps = {
    mission?: CompanyValue;
    vision?: CompanyValue;
    values: CompanyValue[];
};

export default function CompanyValuesIndex() {
    const { mission, vision, values: initialValues } = usePage<PageProps>().props;
    const [editingId, setEditingId] = useState<number | null>(null);
    const [values, setValues] = useState<CompanyValue[]>(initialValues);
    const [newValue, setNewValue] = useState('');

    const { data, setData, post, put, delete: destroy } = useForm({
        mission: mission?.content || '',
        vision: vision?.content || '',
    });

    const submitSection = (type: 'mission' | 'vision') => {
        const content = data[type];
        if (!content.trim()) return;

        const url = '/admin/company-values';
        const formData = { type, content };

        if (type === 'mission' && mission) {
            put(`${url}/${mission.id}`, { data: formData });
        } else if (type === 'vision' && vision) {
            put(`${url}/${vision.id}`, { data: formData });
        } else {
            post(url, { data: formData });
        }
    };

    const moveValue = (index: number, direction: 'up' | 'down') => {
        if (
            (direction === 'up' && index === 0) ||
            (direction === 'down' && index === values.length - 1)
        ) {
            return;
        }

        const newValues = [...values];
        const newIndex = direction === 'up' ? index - 1 : index + 1;

        // Swap positions
        [newValues[index], newValues[newIndex]] = [newValues[newIndex], newValues[index]];

        // Update sort_order
        const updatedValues = newValues.map((item, i) => ({
            ...item,
            sort_order: i
        }));

        setValues(updatedValues);

        // API call to update order
        post('/admin/company-values/reorder', {
            values: updatedValues.map(v => v.id)
        });
    };

    return (
        <AppLayout>
            <Head title="Company Values" />

            <div className="max-w-7xl mx-auto px-6 text-black py-12">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Company Values</h1>
                </div>

                {/* Mission & Vision Cards */}
                <div className="grid md:grid-cols-2 gap-6 mb-12">
                    <SectionCard
                        type="mission"
                        title="Our Mission"
                        value={mission}
                        content={data.mission}
                        onChange={(e) => setData('mission', e.target.value)}
                        onSubmit={() => submitSection('mission')}
                        icon="target"
                    />

                    <SectionCard
                        type="vision"
                        title="Our Vision"
                        value={vision}
                        content={data.vision}
                        onChange={(e) => setData('vision', e.target.value)}
                        onSubmit={() => submitSection('vision')}
                        icon="eye"
                    />
                </div>

                {/* Core Values Section */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-semibold">Core Values</h2>
                        <button
                            className="btn-primary"
                            onClick={() => {
                                setEditingId(-1); // Special ID for new value
                                setNewValue('');
                            }}
                        >
                            <Plus className="w-4 h-4 mr-2" />
                            Add Value
                        </button>
                    </div>

                    <ul className="space-y-3">
                        {values.map((value, index) => (
                            <li key={value.id} className="bg-gray-50 rounded-lg p-4">
                                {editingId === value.id ? (
                                    <ValueEditForm
                                        value={value}
                                        onCancel={() => setEditingId(null)}
                                        onSave={(updated) => {
                                            put(`/admin/company-values/${value.id}`, {
                                                data: updated,
                                                onSuccess: () => setEditingId(null)
                                            } as any);
                                        }}
                                    />
                                ) : (
                                    <div className="flex items-center">
                                        <div className="flex-1">
                                            <h3 className="font-medium">{value.title || 'Core Value'}</h3>
                                            <p className="text-gray-600">{value.content}</p>
                                        </div>

                                        <div className="flex items-center space-x-2">
                                            <button
                                                onClick={() => moveValue(index, 'up')}
                                                disabled={index === 0}
                                                className="text-gray-500 hover:text-blue-500 disabled:text-gray-300"
                                            >
                                                <ChevronUp className="w-5 h-5" />
                                            </button>
                                            <button
                                                onClick={() => moveValue(index, 'down')}
                                                disabled={index === values.length - 1}
                                                className="text-gray-500 hover:text-blue-500 disabled:text-gray-300"
                                            >
                                                <ChevronDown className="w-5 h-5" />
                                            </button>
                                            <button
                                                onClick={() => setEditingId(value.id)}
                                                className="text-gray-500 hover:text-blue-500"
                                            >
                                                <Pencil className="w-5 h-5" />
                                            </button>
                                            <button
                                                onClick={() => destroy(`/admin/company-values/${value.id}`)}
                                                className="text-gray-500 hover:text-red-500"
                                            >
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>

                    {/* Add New Value Form (shown when editingId is -1) */}
                    {editingId === -1 && (
                        <div className="mt-6 bg-blue-50 p-4 rounded-lg">
                            <h3 className="font-medium mb-3">New Core Value</h3>
                            <div className="flex flex-col space-y-3">
                                <input
                                    type="text"
                                    value={newValue}
                                    onChange={(e) => setNewValue(e.target.value)}
                                    placeholder="Enter value title (optional)"
                                    className="input-field"
                                />
                                <textarea
                                    value={newValue}
                                    onChange={(e) => setNewValue(e.target.value)}
                                    placeholder="Describe the core value"
                                    className="input-field min-h-[100px]"
                                />
                                <div className="flex justify-end space-x-3">
                                    <button
                                        onClick={() => setEditingId(null)}
                                        className="btn-secondary"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={() => {
                                            post('/admin/company-values', {
                                                data: {
                                                    type: 'value',
                                                    content: newValue
                                                },
                                                onSuccess: () => {
                                                    setNewValue('');
                                                    setEditingId(null);
                                                }
                                            } as any);
                                        }}
                                        className="btn-primary"
                                        disabled={!newValue.trim()}
                                    >
                                        Save Value
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}

// Reusable Section Card Component
function SectionCard({ type, title, value, content, onChange, onSubmit, icon }: {
    type: 'mission' | 'vision';
    title: string;
    value?: CompanyValue;
    content: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    onSubmit: () => void;
    icon: string;
}) {
    return (
        <div className="bg-white rounded-xl shadow-sm p-6 h-full">
            <div className="flex items-center mb-4">
                <div className={`icon-container ${type}`}>
                    {icon === 'target' ? (
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 100-12 6 6 0 000 12z" clipRule="evenodd" />
                        </svg>
                    ) : (
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                        </svg>
                    )}
                </div>
                <h2 className="text-xl font-semibold ml-3">{title}</h2>
            </div>

            <textarea
                value={content}
                onChange={onChange}
                className="w-full min-h-[120px] input-field mb-4"
                placeholder={`Describe your company's ${type}`}
            />

            <button
                onClick={onSubmit}
                className="btn-primary"
                disabled={!content.trim()}
            >
                {value ? 'Update' : 'Save'} {title}
            </button>
        </div>
    );
}

// Value Edit Form Component
function ValueEditForm({ value, onCancel, onSave }: {
    value: CompanyValue;
    onCancel: () => void;
    onSave: (updated: Partial<CompanyValue>) => void;
}) {
    const [formData, setFormData] = useState({
        title: value.title || '',
        content: value.content
    });

    return (
        <div className="w-full">
            <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Value title (optional)"
                className="input-field mb-2"
            />
            <textarea
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                placeholder="Describe the core value"
                className="input-field w-full min-h-[100px] mb-3"
            />
            <div className="flex justify-end space-x-3">
                <button onClick={onCancel} className="btn-secondary">
                    Cancel
                </button>
                <button
                    onClick={() => onSave(formData)}
                    className="btn-primary"
                    disabled={!formData.content.trim()}
                >
                    Save
                </button>
            </div>
        </div>
    );
}