import React, { useState } from 'react';
import '../styles/PersonalInfo.css';

interface PersonalInfoData {
  name: string;
  email: string;
  phone: string;
}

const PersonalInfo: React.FC = () => {
  const [editMode, setEditMode] = useState<boolean>(true);
  const [formData, setFormData] = useState<PersonalInfoData>({
    name: '',
    email: '',
    phone: '',
  });
  const [errors, setErrors] = useState<Partial<PersonalInfoData>>({});

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^\d{10}$|^\d{3}-\d{3}-\d{4}$/;
    return phoneRegex.test(phone);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    const newErrors: Partial<PersonalInfoData> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = 'Invalid phone format (use 1234567890 or 123-456-7890)';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    // Clear errors and switch to display mode
    setErrors({});
    setEditMode(false);
  };

  const handleEdit = () => {
    setEditMode(true);
  };

  return (
    <div className="personal-info-container">
      <h2>Personal Information</h2>
      
      {editMode ? (
        <form onSubmit={handleSubmit} className="personal-info-form">
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
            />
            {errors.name && <span className="error">{errors.name}</span>}
          </div>
          
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>
          
          <div className="form-group">
            <label htmlFor="phone">Phone:</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your phone number (e.g., 123-456-7890)"
            />
            {errors.phone && <span className="error">{errors.phone}</span>}
          </div>
          
          <button type="submit" className="submit-btn">Submit</button>
        </form>
      ) : (
        <div className="personal-info-display">
          <div className="info-item">
            <strong>Name:</strong> {formData.name}
          </div>
          <div className="info-item">
            <strong>Email:</strong> {formData.email}
          </div>
          <div className="info-item">
            <strong>Phone:</strong> {formData.phone}
          </div>
          <button onClick={handleEdit} className="edit-btn">Edit</button>
        </div>
      )}
    </div>
  );
};

export default PersonalInfo;
