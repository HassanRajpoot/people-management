import React, { useState } from 'react';
import axios from 'axios';
import { Link ,Head} from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';


const Create = () => {
  const [form, setForm] = useState({
    name: '',
    surname: '',
    south_african_id: '',
    mobile_number: '',
    email: '',
    birth_date: '',
    language: '',
    interests: [],
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post('/people', form);
      // Redirect or show success message
      alert('Person added successfully');
    } catch (err) {
      setError('There was an error submitting the form.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleInterestChange = (e) => {
    const { value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      interests: prevForm.interests.includes(value)
        ? prevForm.interests.filter((interest) => interest !== value)
        : [...prevForm.interests, value],
    }));
  };

  return (
    <AuthenticatedLayout
    header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800">
            Add People
        </h2>
    }
>
    <Head title="Dashboard" />
    <div style={{ maxWidth: '600px', margin: '20px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px', backgroundColor: '#f9f9f9' }}>
      <Link
        href={route('people.index')}
        style={{
          padding: '10px 20px',
          backgroundColor: '#6c757d',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '16px',
          marginBottom: '20px',
          display: 'inline-block'
        }}
      >
        Back to List
      </Link>
      {error && <div style={{ color: 'red', marginBottom: '15px' }}>{error}</div>}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ marginBottom: '10px' }}>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleInputChange}
            required
            style={{ padding: '8px', width: '100%', border: '1px solid #ccc', borderRadius: '4px' }}
          />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label>Surname:</label>
          <input
            type="text"
            name="surname"
            value={form.surname}
            onChange={handleInputChange}
            required
            style={{ padding: '8px', width: '100%', border: '1px solid #ccc', borderRadius: '4px' }}
          />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label>South African ID Number:</label>
          <input
            type="text"
            name="south_african_id"
            value={form.south_african_id}
            onChange={handleInputChange}
            required
            style={{ padding: '8px', width: '100%', border: '1px solid #ccc', borderRadius: '4px' }}
          />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label>Mobile Number:</label>
          <input
            type="text"
            name="mobile_number"
            value={form.mobile_number}
            onChange={handleInputChange}
            required
            style={{ padding: '8px', width: '100%', border: '1px solid #ccc', borderRadius: '4px' }}
          />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label>Email Address:</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleInputChange}
            required
            style={{ padding: '8px', width: '100%', border: '1px solid #ccc', borderRadius: '4px' }}
          />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label>Birth Date:</label>
          <input
            type="date"
            name="birth_date"
            value={form.birth_date}
            onChange={handleInputChange}
            required
            style={{ padding: '8px', width: '100%', border: '1px solid #ccc', borderRadius: '4px' }}
          />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label>Language:</label>
          <select
            name="language"
            value={form.language}
            onChange={handleInputChange}
            required
            style={{ padding: '8px', width: '100%', border: '1px solid #ccc', borderRadius: '4px' }}
          >
            <option value="">Select Language</option>
            <option value="English">English</option>
            <option value="Afrikaans">Afrikaans</option>
            <option value="Zulu">Zulu</option>
          </select>
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label>Interests:</label>
          <select
            name="interests"
            multiple
            value={form.interests}
            onChange={handleInterestChange}
            style={{ padding: '8px', width: '100%', border: '1px solid #ccc', borderRadius: '4px' }}
          >
            <option value="Sports">Sports</option>
            <option value="Music">Music</option>
            <option value="Technology">Technology</option>
            <option value="Art">Art</option>
          </select>
        </div>

        <div>
          <button
            type="submit"
            disabled={loading}
            style={{
              padding: '10px 20px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '16px'
            }}
          >
            {loading ? 'Submitting...' : 'Create'}
          </button>
        </div>
      </form>
    </div>
    </AuthenticatedLayout>
  );
};

export default Create;
