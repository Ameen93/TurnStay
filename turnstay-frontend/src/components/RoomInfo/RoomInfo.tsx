import React, { useEffect, useState } from "react";
import "./RoomInfo.css";

interface Room {
  description: string;
  product: string;
  billing_amount: number;
}

interface RoomInfoProps {
  onSelect: (room: Room) => void;
}

const RoomInfo: React.FC<RoomInfoProps> = ({ onSelect }) => {
  const [rooms, setRooms] = useState<Room[]>([]);

  useEffect(() => {
    fetch("/rooms.json")
      .then((response) => response.json())
      .then((data) => setRooms(data));
  }, []);

  return (
    <div className="room-info-container">
      {rooms.map((room, index) => (
        <div key={index} className="room-card">
          <h3>{room.product}</h3>
          <p>{room.description}</p>
          <p>
            Billing Amount: ${room.billing_amount.toLocaleString()} per night
          </p>
          <button onClick={() => onSelect(room)}>Select {room.product}</button>
        </div>
      ))}
    </div>
  );
};

export default RoomInfo;
