import { DeleteOutlined } from '@ant-design/icons';
import { Button, Card } from 'antd';
import { useState } from 'react';
import './YourCardStyle.css'; // Import your custom styles for the cards

const YourCard = ({ title, content }) => {
  const [showDeleteButton, setShowDeleteButton] = useState(false);

  const handleMouseEnter = () => {
    setShowDeleteButton(true);
  };

  const handleMouseLeave = () => {
    setShowDeleteButton(false);
  };

  const handleDelete = () => {
    // Perform any deletion logic or API calls here
    // Once the deletion is completed, you can handle the action accordingly.
  };

  return (
    <div className="your-card" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <Card title={title}>
        <p>{content}xxxxxxx</p>
      </Card>
      {showDeleteButton && (
        <Button className="delete-button" onClick={handleDelete}>
          <DeleteOutlined />
        </Button>
      )}
    </div>
  );
};

export default YourCard;
