/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { getMember } from '../api/MemberData';
import { useAuth } from '../utils/context/authContext';
import MemberCard from '../components/MemberCard';

export default function TeamPage() {
  const [members, setMembers] = useState([]);
  const { user } = useAuth();

  const getAllTheMembers = () => {
    getMember(user.uid).then(setMembers);
  };

  useEffect(() => {
    getAllTheMembers();
  }, []);

  return (
    <div>
      <h1 className="text-center d-flex flex-column justify-content-center align-content-center">TEAM</h1>
      {members.map((member) => (
        <MemberCard key={member.firebaseKey} memberObj={member} onUpdate={getAllTheMembers} />
      ))}
    </div>
  );
}
