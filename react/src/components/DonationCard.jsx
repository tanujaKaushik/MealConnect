import React from 'react';
import styled from 'styled-components';

// FoodDonationCard Component
const FoodDonationCard = ({ donation }) => {

  const formattedTime = new Date(donation.createdAt).toLocaleString();

  return (
    <CardContainer>
      {/* <CardHeader>Food Donation</CardHeader> */}
      <CardContent>
        {/* <InfoLabel>Name:</InfoLabel> */}
        <InfoTextBold >{donation.name}</InfoTextBold>

        <InfoLabel>wants to donate </InfoLabel>
        <InfoText>{donation.foodType}</InfoText>

        <InfoLabel>at </InfoLabel>
        <InfoTextBold>{donation.address}</InfoTextBold>

        <InfoLabel>Quantity:</InfoLabel>
        <InfoText>{donation.quantity}</InfoText>

        <InfoLabel>Contact Details:</InfoLabel>
        <InfoText>{donation.contactDetails}</InfoText>

        <InfoText>{formattedTime}</InfoText>
      </CardContent>
    </CardContainer>
  );
};

// Container for the donation card
const CardContainer = styled.div`
  background-color: #ffebcc;
  border-radius: 15px;
  width: 300px;
  margin: 10px;
  padding: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: translateY(-5px);
  }
`;

// Header for the card
const CardHeader = styled.h3`
  text-align: center;
  color: #4a4a4a;
  margin-bottom: 10px;
  font-family: 'Arial', sans-serif;
  font-weight: bold;
`;

// Content inside the card
const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 14px;
`;

// Label for each piece of information
const InfoLabel = styled.div`
  font-weight: bold;
  color: #4a4a4a;
  margin-bottom: 5px;
`;

// Regular text style for information
const InfoText = styled.div`
  margin-bottom: 15px;
  color: #333;
`;

// Bold text style for address
const InfoTextBold = styled.div`
  margin-bottom: 15px;
  color: #333;
  font-weight: bold;
  font-size: 20px;
`;

export default FoodDonationCard;
