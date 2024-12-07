import React from 'react';
import { useForm } from '@inertiajs/react';
import '../../../css/deleteAndIndex.css';

const Delete = ({ personId, onClose }) => {
    const { delete: destroy } = useForm();

    const handleDelete = () => {
        destroy(route('people.destroy', personId));
        onClose(); // Close modal after deleting
    };

    const handleCancel = () => {
        onClose(); // Close modal without deleting
    };

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 9999
        }}>
            <div style={{
                backgroundColor: 'white',
                padding: '20px',
                borderRadius: '8px',
                textAlign: 'center',
                width: '300px',
                boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                maxWidth: '80%',
                position: 'relative'
            }}>
                <h1 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '10px' }}>Delete Person</h1>
                <p style={{ marginBottom: '20px' }}>Are you sure you want to delete this person?</p>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginTop: '20px'
                }}>
                    <button 
                        style={{
                            padding: '10px 20px',
                            backgroundColor: '#ff4d4d',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer'
                        }}
                        onClick={handleDelete}
                    >
                        Yes, Delete
                    </button>
                    <button 
                        style={{
                            padding: '10px 20px',
                            backgroundColor: '#f0f0f0',
                            border: '1px solid #ccc',
                            color: '#333',
                            borderRadius: '5px',
                            cursor: 'pointer'
                        }}
                        onClick={handleCancel}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Delete;
