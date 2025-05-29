import React, { useState } from 'react';
import '../styles/Experience.css';

interface ExperienceData {
  company: string;
  position: string;
  responsibilities: string;
  startDate: string;
  endDate: string;
}

const Experience: React.FC = () => {
  const [editMode, setEditMode] = useState<boolean>(true);
  const [formData, setFormData] = useState<ExperienceData>({
    company: '',
    position: '',
    responsibilities: '',
    startDate: '',
    endDate: '',
  });
  const [errors, setErrors] = useState<Partial<ExperienceData>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    const newErrors: Partial<ExperienceData> = {};
    
    if (!formData.company.trim()) {
      newErrors.company = 'Company name is required';
    }
    
    if (!formData.position.trim()) {
      newErrors.position = 'Position title is required';
    }
    
    if (!formData.responsibilities.trim()) {
      newErrors.responsibilities = 'Responsibilities are required';
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

  // Format responsibilities for display (convert newlines to <br> elements)
  const formatResponsibilities = (text: string): React.ReactNode[] => {
    if (!text) return [<span key="empty"></span>];
    
    return text.split('\n').map((line, index) => (
      <React.Fragment key={index}>
        {line}
        {index < text.split('\n').length - 1 && <br />}
      </React.Fragment>
    ));
  };

  return (
    <div className="experience-container">
      <h2>Professional Experience</h2>
      
      {editMode ? (
        <form onSubmit={handleSubmit} className="experience-form">
          <div className="form-group">
            <label htmlFor="company">Company:</label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="Enter company name"
            />
            {errors.company && <span className="error">{errors.company}</span>}
          </div>
          
          <div className="form-group">
            <label htmlFor="position">Position:</label>
            <input
              type="text"
              id="position"
              name="position"
              value={formData.position}
              onChange={handleChange}
              placeholder="Enter position title"
            />
            {errors.position && <span className="error">{errors.position}</span>}
          </div>
          
          <div className="form-group">
            <label htmlFor="responsibilities">Responsibilities:</label>
            <textarea
              id="responsibilities"
              name="responsibilities"
              value={formData.responsibilities}
              onChange={handleChange}
              placeholder="Enter your main responsibilities"
              rows={4}
            />
            {errors.responsibilities && <span className="error">{errors.responsibilities}</span>}
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
        <div className="experience-display">
          <div className="info-item">
            <strong>Company:</strong> {formData.company}
          </div>
          <div className="info-item">
            <strong>Position:</strong> {formData.position}
          </div>
          <div className="info-item">
            <strong>Duration:</strong> {formatDate(formData.startDate)} - {formatDate(formData.endDate)}
          </div>
          <div className="info-item">
            <strong>Responsibilities:</strong>
            <p className="responsibilities-text">
              {formatResponsibilities(formData.responsibilities)}
            </p>
          </div>
          <button onClick={handleEdit} className="edit-btn">Edit</button>
        </div>
      )}
    </div>
  );
};

export default Experience;
