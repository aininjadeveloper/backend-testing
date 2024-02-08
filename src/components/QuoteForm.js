import React, { useEffect, useState } from 'react';
import axios from 'axios';

const QuoteForm = () => {
  const [formData, setFormData] = useState({
    customerName: '',
    quoteNumber: '',
    emailAddress: '',
  });
  const [allQuotes, setallQuotes] = useState([]); // State to hold the fetched quotes

  useEffect(() => {
    axios({
      method: "get",
      url: "http://localhost:3001/quotes",
    }).then((res) => {
      setallQuotes(res.data);
    });
  }, []);

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
    const datasend = {
      customerName: formData.customerName,
      quoteNumber: formData.quoteNumber,
      emailAddress: formData.emailAddress
    };

    console.log("Sending data: ", datasend);

    try {
      const response = await axios.post("http://localhost:3001/NewQuote", datasend);
      if (response.status === 200) {
        console.log("Basic information send successfully", response.data);
      }
    } catch (error) {
      console.error("Error in submitting the zrom", error);
    }
  };

  return (
    <div>
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

      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%' }}>
        <table style={{ textAlign: 'center', margin: 'auto', marginTop: '10px'}}> {/* Centers the table horizontally in the div */}
          <tbody>
            {allQuotes.length === 0 ? (
              <tr>
                <td colSpan="6" className="empty-message">
                  There are no service items.
                </td>
              </tr>
            ) : (
              allQuotes.map((service) => (
                <tr
                  key={service.id}
                  //onClick={toggleTableRow}
                  style={{ cursor: "pointer" }}
                >
                  <td style={{ textAlign: "right" }}>{service.customerName}</td>
                  <td className="service-name">{service.quoteNumber}</td>
                  <td className="service-name">{service.emailAddress}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default QuoteForm;
