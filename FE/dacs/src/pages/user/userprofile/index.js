import React, { useState, useRef } from 'react';
import styles from './userProfile.module.scss';
import clsx from 'clsx';
import avatar from "../../../assets/images/avatar_25.jpg";
import ShowPassword from "../../../component/auth/ShowPassword";

const ImageWrapper = ({ src, alt, className }) => (
  <img loading="lazy" src={src} alt={alt} className={className} />
);

const Button = ({ children, className, onClick, type }) => (
  <button type={type} className={className} onClick={onClick}>{children}</button>
);

const SectionTitle = ({ children }) => (
  <h2 className={styles.sectionTitle}>{children}</h2>
);

const SectionSubtitle = ({ children }) => (
  <h3 className={styles.sectionSubtitle}>{children}</h3>
);

const InputField = ({ label, value, onChange, error }) => (
  <>
    <label className={styles.visuallyHidden}>{label}</label>
    <input
      type="text"
      className={clsx(styles.inputField, error && styles.errorInput)}
      value={value}
      onChange={onChange}
      aria-label={label}
    />
    {error && <div className={styles.errorText}>{error}</div>}
  </>
);

const PasswordField = ({ label, value, onChange, inputRef, error }) => (
  <div style={{ position: 'relative', marginBottom: '10px' }}> 
    <label className={styles.visuallyHidden}>{label}</label>
    <div className={styles.inputContainer}>
      <input
        type="password"
        className={clsx( error && styles.errorInput)}
        value={value}
        onChange={onChange}
        ref={inputRef}
        style={{ paddingRight: '30px' }}
      />
        <ShowPassword passInput={inputRef.current} />
    </div>
    {error && <div className={styles.errorText}>{error}</div>}
  </div>
);

function isValidEmail(email) {
  const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
  return emailRegex.test(email);
}

function isPasswordStrong(password) {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/;
  return passwordRegex.test(password);
}

const Divider = () => <hr className={styles.divider} />;

function UserProfile() {
  const fileInputRef = useRef(null);
  const [activeForm, setActiveForm] = useState('details');
  const [errors, setErrors] = useState({});

  const [avatarSrc, setAvatarSrc] = useState(avatar);
  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '', 
  });

  const currentPasswordRef = useRef();
  const newPasswordRef = useRef();
  const confirmPasswordRef = useRef();

  const handleInputChange = (field) => (e) => {
    setFormData({
      ...formData,
      [field]: e.target.value
    });
    // Validation for non-empty fields
    if (field === 'firstName' || field === 'lastName') {
      setErrors(prevErrors => ({
        ...prevErrors,
        [field]: e.target.value.trim() ? '' : `${field.replace('Name', ' name')} cannot be empty`
      }));
    }
    if (field === 'email') {
      setErrors(prevErrors => ({
        ...prevErrors,
        email: isValidEmail(e.target.value) ? '' : 'Invalid email format'
      }));
    }
  };

  const handlePasswordChange = (field) => (e) => {
    setPasswords({
      ...passwords,
      [field]: e.target.value
    });
  };

  const handleNavItemClick = (formType) => {
    setActiveForm(formType);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setAvatarSrc(URL.createObjectURL(file));
    }
  };

  const handleFileClick = () => {
    fileInputRef.current.click();
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name cannot be empty';
      valid = false;
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name cannot be empty';
      valid = false;
    }

    if (activeForm === 'details') {
      if (!isValidEmail(formData.email)) {
        newErrors.email = 'Please enter a valid email';
        valid = false;
      }
    } else if (activeForm === 'password') {
      if (!isPasswordStrong(passwords.newPassword)) {
        newErrors.newPassword = 'Password must have at least 8 characters, including uppercase, lowercase, and special characters.';
        valid = false;
      }
      if (passwords.newPassword !== passwords.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match.';
        valid = false;
      }
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validateForm()) {
      console.error('Invalid input');
      return;
    }
    console.log('Form submitted successfully');
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.headerActions}>
            <div className={styles.headerTitle}>
              <ImageWrapper src={avatarSrc} className={styles.headerIcon} />
              <SectionTitle>UserName</SectionTitle>
            </div>
          </div>
          </div>

        </header>
        <nav className={styles.navMenu}>
          <ul className={clsx("flex flex-row")}>
            <li className={styles.navItem} onClick={() => handleNavItemClick('details')}>My details</li>
            <li className={styles.navItem} onClick={() => handleNavItemClick('password')}>Password</li>
          
          </ul>
        </nav>
        <main className={clsx("ml-[90px]")}>
          {activeForm === 'details' ? (
            <form onSubmit={handleSubmit}>
              <div className={styles.userDetails}>
                <div className={styles.userDetailCol}>
                  <SectionSubtitle>First name</SectionSubtitle>
                  <InputField label="First name" value={formData.firstName} onChange={handleInputChange('firstName')} error={errors.firstName} />
                </div>
                <div className={styles.userDetailCol}>
                  <SectionSubtitle>Last name</SectionSubtitle>
                  <InputField label="Last name" value={formData.lastName} onChange={handleInputChange('lastName')} error={errors.lastName} />
                </div>
              </div>
              <Divider />
              <section>
                <SectionSubtitle>Email</SectionSubtitle>
                <InputField label="Email" value={formData.email} onChange={handleInputChange('email')} error={errors.email} />
                <SectionSubtitle>Avatar</SectionSubtitle>
                <ImageWrapper
                  src={avatarSrc}
                  alt="User avatar"
                  className={clsx("w-[250px] h-[200px]",styles.verifiedIcon)}
                  
                />
                <div className={styles.uploadContainer} onClick={handleFileClick}>
                  Click to upload or drag and drop <br /> SVG, PNG, JPG, or GIF (max. 800x400px)
                </div>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  style={{ display: 'none' }}
                />
              </section>
              <div className={styles.buttonContainer}>
              <Button type="submit" className={clsx(styles.saveButton)}>Save</Button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleSubmit}>
              <SectionTitle>Password Change</SectionTitle>
              <SectionSubtitle>Current Password</SectionSubtitle>
              <PasswordField
                label="Current Password"
                value={passwords.currentPassword}
                onChange={handlePasswordChange('currentPassword')}
                inputRef={currentPasswordRef}
                error={errors.currentPassword}
              />
               <SectionSubtitle>New Password</SectionSubtitle>
              <PasswordField
                label="New Password"
                value={passwords.newPassword}
                onChange={handlePasswordChange('newPassword')}
                inputRef={newPasswordRef}
                error={errors.newPassword}
              />
              <SectionSubtitle>Confirm New Password</SectionSubtitle>
              <PasswordField
                label="Confirm New Password"
                value={passwords.confirmPassword}
                onChange={handlePasswordChange('confirmPassword')}
                inputRef={confirmPasswordRef}
                error={errors.confirmPassword}
              />
              <Button type="submit" className={styles.saveButton}>Save</Button>
            </form>
          )}
        </main>
      </div>
    );
  }
  
export default UserProfile;
