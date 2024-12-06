import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const FoodForm = ({ isOpen, onClose, currentUser }) => {
  const [formData, setFormData] = useState({
    name: currentUser.username || '', // Automatically populate Name from currentUser
    address: currentUser?.address || '',
    foodType: '',
    quantity: '',
    contactDetails: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/food/submitdonation', formData);
      console.log('Form submitted successfully:', response.data);
      onClose();  // Close the modal after submission
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <Overlay>
      <ModalContainer>
        <Heading>ADDING DONATION</Heading>
        <Form onSubmit={handleSubmit}>
          <Label>Name</Label>
          {/* Display name as text */}
          <NameText>{formData.name}</NameText>

          <Label>Address</Label>
          <Input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            placeholder="Enter your delivery address"
          />

          <Label>Type of Food</Label>
          <Input
            type="text"
            name="foodType"
            value={formData.foodType}
            onChange={handleChange}
            required
            placeholder="Enter the type of food (e.g., Pizza, Pasta)"
          />

          <Label>Quantity</Label>
          <Input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            required
            placeholder="Enter quantity (e.g., 2)"
          />

          <Label>Contact Details</Label>
          <Input
            type="text"
            name="contactDetails"
            value={formData.contactDetails}
            onChange={handleChange}
            required
            placeholder="Enter your contact number"
          />

          <ButtonContainer>
            <Button type="submit">Submit</Button>
            <CloseButton onClick={onClose}>Close</CloseButton>
          </ButtonContainer>
        </Form>
      </ModalContainer>
    </Overlay>
  );
};

export default FoodForm;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContainer = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 10px;
  width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

const Heading = styled.h2`
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 1.5rem;
  font-weight: bold;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Label = styled.label`
  margin-bottom: 0.5rem;
  font-weight: bold;
`;

const Input = styled.input`
  padding: 0.75rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const NameText = styled.div`
  padding: 0.75rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f4f4f4;
  color: #333;
  display: flex;
  align-items: center;
  justify-content: flex-start;  /* Aligns the text to the left */
  height: 3rem;
  width: 100%;
  text-align: left; /* Ensures the text aligns left */
  padding-left: 1rem; /* Adds some space from the left edge */
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 1rem;
`;

const Button = styled.button`
  padding: 0.75rem;
//   background-color: #4caf50;
  background-color: #000036;
  border:1px solid #000036
  color: black;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  margin-bottom: 0.75rem;

  &:hover {
    background-color: #45a049;
  }
`;

const CloseButton = styled.button`
  padding: 0.75rem;
  background-color: transparent;
  border: 1px solid #ccc;
  color: black;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  &:hover {
    background-color: #f0f0f0;
  }
`;
