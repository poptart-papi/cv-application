import React, { useState } from 'react';
import '../styles/Education.css';

interface EducationData {
  school: string;
  degree: string;
  startDate: string;
  endDate: string;
}

const Education: React.FC = () => {
  const [editMode, setEditMode] = useState<boolean>(true);
  const [formData, setFormData] = useState<EducationData>({
    school: '',
    degree: '',
    startDate: '',
    endDate: '',
  });
  const [errors, setErrors] = useState<Partial<EducationData>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    const newErrors: Partial<EducationData> = {};
    
    if (!formData.school.trim()) {
      newErrors.school = 'School name is required';
    }
    
    if (!formData.degree.trim()) {
      newErrors.degree = 'Degree/title of study is required';
    }
    
    if (!formData.startDate) {
      newErrors.startDate = 'Start date is required';
    }
    
    if (!formData.endDate) {
      newErrors.endDate = 'End date is required';
    } else if (formData.startDate && formData.endDate && new Date(formData.endDate) < new Date(formData.startDate)) {
      newErrors.endDate = 'End date cannot be before start date';
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

  // Format date for display (YYYY-MM-DD to Month Year)
  const formatDate = (dateString: string): string => {
    if (!dateString) return '';
    
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
    });
  };

  return (
    <div className="education-container">
      <h2>Education</h2>
      
      {editMode ? (
        <form onSubmit={handleSubmit} className="education-form">
          <div className="form-group">
            <label htmlFor="school">School:</label>
            <input
              type="text"
              id="school"
              name="school"
              value={formData.school}
              onChange={handleChange}
              placeholder="Enter school name"
            />
            {errors.school && <span className="error">{errors.school}</span>}
          </div>
          
          <div className="form-group">
            <label htmlFor="degree">Degree/Title of Study:</label>
            <input
              type="text"
              id="degree"
              name="degree"
              value={formData.degree}
              onChange={handleChange}
              placeholder="Enter degree or title of study"
            />
            {errors.degree && <span className="error">{errors.degree}</span>}
          </div>
          
          <div className="form-group">
            <label htmlFor="startDate">Start Date:</label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
            />
            {errors.startDate && <span className="error">{errors.startDate}</span>}
          </div>
          
          <div className="form-group">
            <label htmlFor="endDate">End Date:</label>
            <input
              type="date"
              id="endDate"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
            />
            {errors.endDate && <span className="error">{errors.endDate}</span>}
          </div>
          
          <button type="submit" className="submit-btn">Submit</button>
        </form>
      ) : (
        <div className="education-display">
          <div className="info-item">
            <strong>School:</strong> {formData.school}
          </div>
          <div className="info-item">
            <strong>Degree/Title of Study:</strong> {formData.degree}
          </div>
          <div className="info-item">
            <strong>Duration:</strong> {formatDate(formData.startDate)} - {formatDate(formData.endDate)}
          </div>
          <button onClick={handleEdit} className="edit-btn">Edit</button>
        </div>
      )}
    </div>
  );
};

export default Education;
