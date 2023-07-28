/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { getMember } from '../api/MemberData';
import { useAuth } from '../utils/context/authContext';
import MemberCard from '../components/MemberCard';
import SearchBar from '../components/Search';

export default function TeamPage() {
  const [members, setMembers] = useState([]);
  const { user } = useAuth();

  const getAllTheMembers = () => {
    getMember(user.uid).then(setMembers);
  };

  useEffect(() => {
    getAllTheMembers();
  }, []);

  const filterResult = (query) => {
    if (!query) {
      getAllTheMembers();
    } else {
      const filter = members.filter((member) => {
        const nameLower = member.name.toLowerCase();
        const roleLower = member.role.toLowerCase();
        return nameLower.includes(query) || roleLower.includes(query);
      });
      setMembers(filter);
    }
  };

  return (
    <>
      <SearchBar onKeyUp={(query) => filterResult(query)} />
      <h1 className="teamtxt">TEAM</h1>
      <div className="cards">
        {members.map((member) => (
          <MemberCard key={member.firebaseKey} memberObj={member} onUpdate={getAllTheMembers} />
        ))}
      </div>
    </>
  );
}
