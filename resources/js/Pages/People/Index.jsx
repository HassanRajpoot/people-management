import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import Delete from './Delete';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import '../../../css/deleteAndIndex.css';
import { Head } from '@inertiajs/react';

const Index = ({ people }) => {
    const [showDeleteModal, setShowDeleteModal] = useState(null);

    const handleDeleteClick = (id) => {
        setShowDeleteModal(id);
    };

    const handleCloseModal = () => {
        setShowDeleteModal(null);
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    People List
                </h2>
            }
        >
            <Head title="Dashboard" />
            <div className="index-container">
                <div style={{ marginBottom: '20px', textAlign: 'right' }}>
                    <Link href={route('people.create')} style={{
                        padding: '10px 20px',
                        backgroundColor: '#28a745',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '16px',
                    }}>
                        Create New Person
                    </Link>
                </div>
                <ul className="people-list">
                    {people.map((person) => (
                        <li key={person.id} className="person-item">
                            <span>{person.name} {person.surname}</span>
                            <div className="person-actions">
                                <Link className="index-button edit-button" href={route('people.edit', person.id)}>
                                    Edit
                                </Link>
                                <button
                                    className="index-button delete-button"
                                    onClick={() => handleDeleteClick(person.id)}
                                >
                                    Delete
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>

                {/* Delete modal */}
                {showDeleteModal && (
                    <Delete personId={showDeleteModal} onClose={handleCloseModal} />
                )}
            </div>
        </AuthenticatedLayout>
    );
};

export default Index;
