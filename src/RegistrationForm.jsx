import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "./style/form.css";

const RegistrationForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const selectedRole = watch("role");
  const [licenseFile, setLicenseFile] = useState(null);

  const onSubmit = (data) => {
    if (selectedRole === "Driver" && licenseFile) {
      data.licenseFileName = licenseFile.name;
    }

    console.log("JSON DATA:", JSON.stringify(data, null, 2));
    if (licenseFile) {
      console.log("Uploaded File Object:", licenseFile);
    }

    reset();
    setLicenseFile(null);
  };

  return (
    <div className="form-container">
      <h2>Registration Form</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>First Name</label>
        <input {...register("firstName", { required: true })} />
        {errors.firstName && <p className="error">First name is required</p>}

        <label>Last Name</label>
        <input {...register("lastName", { required: true })} />
        {errors.lastName && <p className="error">Last name is required</p>}

        <label>Email</label>
        <input
          type="email"
          {...register("email", {
            required: true,
            pattern: /^\S+@\S+\.\S+$/,
          })}
        />
        {errors.email && <p className="error">Valid email is required</p>}

        <label>Mobile Number</label>
        <input
          {...register("mobile", {
            required: true,
            pattern: /^[0-9]{10}$/,
          })}
        />
        {errors.mobile && <p className="error">10-digit number required</p>}

        <label>Role</label>
        <select {...register("role", { required: true })}>
          <option value="">Select Role</option>
          <option value="Driver">Driver</option>
          <option value="Customer">Customer</option>
          <option value="Manager">Manager</option>
        </select>
        {errors.role && <p className="error">Role is required</p>}

        {selectedRole === "Driver" && (
          <>
            <label>Driving License Number</label>
            <input {...register("license", { required: true })} />
            {errors.license && <p className="error">License is required</p>}

            <label>Upload License Photo</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setLicenseFile(e.target.files[0])}
            />
            {!licenseFile && <p className="error">License photo is required</p>}
          </>
        )}

        {selectedRole === "Customer" && (
          <>
            <label>Residential Address</label>
            <input {...register("address", { required: true })} />
            {errors.address && <p className="error">Address is required</p>}
          </>
        )}

        {selectedRole === "Manager" && (
          <>
            <label>Area of Control</label>
            <input {...register("area", { required: true })} />
            {errors.area && <p className="error">Area is required</p>}
          </>
        )}

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegistrationForm;
