import React, { useState } from 'react';
import axios from 'axios';

const QuoteForm = () => {
  const [formData, setFormData] = useState({
    customerName: '',
    quoteNumber: '',
    emailAddress: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    //Simplified data object conating only basic information
    const datasend ={
      customerName: formData.customerName,
      quoteNumber: formData.quoteNumber,
      emailAddress: formData.emailAddress
    };

    console.log("Sending data: ", datasend);

    try {
      const response = await axios.post("https://115.99.110.243/32/NewQuote", datasend);
      if(response.status === 200) {
        console.log("Basic information send successfully", response.data); 
      }
    } catch (error) {
      console.error("Error in submitting the zrom", error);
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <div>
        <label htmlFor="customerName">Customer Name:</label>
        <input
          type="text"
          id="customerName"
          name="customerName"
          value={formData.customerName}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label htmlFor="quoteNumber">Quote Number:</label>
        <input
          type="text"
          id="quoteNumber"
          name="quoteNumber"
          value={formData.quoteNumber}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label htmlFor="emailAddress">Email Address:</label>
        <input
          type="email"
          id="emailAddress"
          name="emailAddress"
          value={formData.emailAddress}
          onChange={handleChange}
          required
        />
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default QuoteForm;
