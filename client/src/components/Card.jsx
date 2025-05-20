// src/components/Card.jsx
const Card = ({ title, description, price }) => {
  return (
    <div style={{
      border: '1px solid #ccc',
      borderRadius: '8px',
      padding: '10px',
      margin: '10px',
      width: '200px',
      textAlign: 'center',
    }}>
      <h3>{title}</h3>
      <p>{description}</p>
      <strong>Price: ${price}</strong>
    </div>
  );
};

export default Card;
