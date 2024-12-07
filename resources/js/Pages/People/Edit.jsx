import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';
import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

const Edit = ({ person }) => {
    const { data, setData, put, errors } = useForm({
        name: person.name,
        surname: person.surname,
        south_african_id: person.south_african_id,
        mobile_number: person.mobile_number,
        email: person.email,
        birth_date: person.birth_date,
        language: person.language,
        interests: person.interests || [],
    });

    const [showConfirmation, setShowConfirmation] = useState(false); // State to control modal visibility

    const handleSubmit = (e) => {
        e.preventDefault();
        setShowConfirmation(true); // Show the confirmation modal on submit
    };

    const handleConfirmUpdate = () => {
        put(route('people.update', person.id)); // Perform the update
        setShowConfirmation(false); // Close the modal
    };

    const handleCancelUpdate = () => {
        setShowConfirmation(false); // Close the modal without updating
    };

    return (
        <AuthenticatedLayout
        header={
            <h2 className="text-xl font-semibold leading-tight text-gray-800">
                People CRUD
            </h2>
        }
    >
                    <Head title="Dashboard" />

        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <form onSubmit={handleSubmit} style={{ maxWidth: '600px', margin: 'auto' }}>
                <div style={{ marginBottom: '10px' }}>
                    <label style={{ display: 'block', marginBottom: '5px' }}>Name</label>
                    <input
                        type="text"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        style={{ width: '100%', padding: '8px', fontSize: '14px', borderRadius: '4px', border: '1px solid #ccc' }}
                    />
                    {errors.name && <span style={{ color: 'red' }}>{errors.name}</span>}
                </div>

                <div style={{ marginBottom: '10px' }}>
                    <label style={{ display: 'block', marginBottom: '5px' }}>Surname</label>
                    <input
                        type="text"
                        value={data.surname}
                        onChange={(e) => setData('surname', e.target.value)}
                        style={{ width: '100%', padding: '8px', fontSize: '14px', borderRadius: '4px', border: '1px solid #ccc' }}
                    />
                    {errors.surname && <span style={{ color: 'red' }}>{errors.surname}</span>}
                </div>

                <div style={{ marginBottom: '10px' }}>
                    <label style={{ display: 'block', marginBottom: '5px' }}>South African ID</label>
                    <input
                        type="text"
                        value={data.south_african_id}
                        onChange={(e) => setData('south_african_id', e.target.value)}
                        style={{ width: '100%', padding: '8px', fontSize: '14px', borderRadius: '4px', border: '1px solid #ccc' }}
                    />
                    {errors.south_african_id && <span style={{ color: 'red' }}>{errors.south_african_id}</span>}
                </div>

                <div style={{ marginBottom: '10px' }}>
                    <label style={{ display: 'block', marginBottom: '5px' }}>Mobile Number</label>
                    <input
                        type="text"
                        value={data.mobile_number}
                        onChange={(e) => setData('mobile_number', e.target.value)}
                        style={{ width: '100%', padding: '8px', fontSize: '14px', borderRadius: '4px', border: '1px solid #ccc' }}
                    />
                    {errors.mobile_number && <span style={{ color: 'red' }}>{errors.mobile_number}</span>}
                </div>

                <div style={{ marginBottom: '10px' }}>
                    <label style={{ display: 'block', marginBottom: '5px' }}>Email</label>
                    <input
                        type="email"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        style={{ width: '100%', padding: '8px', fontSize: '14px', borderRadius: '4px', border: '1px solid #ccc' }}
                    />
                    {errors.email && <span style={{ color: 'red' }}>{errors.email}</span>}
                </div>

                <div style={{ marginBottom: '10px' }}>
                    <label style={{ display: 'block', marginBottom: '5px' }}>Birth Date</label>
                    <input
                        type="date"
                        value={data.birth_date}
                        onChange={(e) => setData('birth_date', e.target.value)}
                        style={{ width: '100%', padding: '8px', fontSize: '14px', borderRadius: '4px', border: '1px solid #ccc' }}
                    />
                    {errors.birth_date && <span style={{ color: 'red' }}>{errors.birth_date}</span>}
                </div>

                <div style={{ marginBottom: '10px' }}>
                    <label style={{ display: 'block', marginBottom: '5px' }}>Language</label>
                    <input
                        type="text"
                        value={data.language}
                        onChange={(e) => setData('language', e.target.value)}
                        style={{ width: '100%', padding: '8px', fontSize: '14px', borderRadius: '4px', border: '1px solid #ccc' }}
                    />
                    {errors.language && <span style={{ color: 'red' }}>{errors.language}</span>}
                </div>

                <div style={{ marginBottom: '10px' }}>
                    <label style={{ display: 'block', marginBottom: '5px' }}>Interests</label>
                    <input
                        type="text"
                        value={data.interests.join(', ')}
                        onChange={(e) => setData('interests', e.target.value.split(','))}
                        style={{ width: '100%', padding: '8px', fontSize: '14px', borderRadius: '4px', border: '1px solid #ccc' }}
                    />
                    {errors.interests && <span style={{ color: 'red' }}>{errors.interests}</span>}
                </div>

                <div>
                    <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px' }}>
                        Update
                    </button>
                </div>
            </form>

            {/* Show confirmation modal if needed */}
            {showConfirmation && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', textAlign: 'center', width: '300px' }}>
                        <h1>Confirm Update</h1>
                        <p>Are you sure you want to update this person's information?</p>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
                            <button 
                                style={{ padding: '10px 20px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }} 
                                onClick={handleConfirmUpdate}
                            >
                                Yes, Update
                            </button>
                            <button 
                                style={{ padding: '10px 20px', backgroundColor: 'gray', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }} 
                                onClick={handleCancelUpdate}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
        </AuthenticatedLayout>

    );
};

export default Edit;
