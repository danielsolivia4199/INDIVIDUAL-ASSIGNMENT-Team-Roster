import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { deleteMember } from '../api/MemberData';

function MemberCard({ memberObj, onUpdate }) {
  const deleteThisMember = () => {
    if (window.confirm(`Delete ${memberObj.name}?`)) {
      deleteMember(memberObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Img variant="top" src={memberObj.image} alt={memberObj.name} style={{ height: '400px' }} />
      <Card.Body>
        <Card.Title>{memberObj.name}</Card.Title>
        <h5>{memberObj.captain ? <span className="badge text-bg-danger">Captain</span> : ''}</h5>
        <p className="card-text bold">{memberObj.role}</p>
        {/* DYNAMIC LINK TO VIEW THE DETAILS  */}
        <Link href={`/team/${memberObj.firebaseKey}`} passHref>
          <Button variant="danger" className="m-2">VIEW</Button>
        </Link>
        {/* DYNAMIC LINK TO EDIT THE DETAILS  */}
        <Link href={`/team/edit/${memberObj.firebaseKey}`} passHref>
          <Button variant="dark">EDIT</Button>
        </Link>
        <Button variant="danger" onClick={deleteThisMember} className="m-2">
          DELETE
        </Button>
      </Card.Body>
    </Card>
  );
}

MemberCard.propTypes = {
  memberObj: PropTypes.shape({
    image: PropTypes.string,
    name: PropTypes.string,
    role: PropTypes.string,
    captain: PropTypes.bool,
    firebaseKey: PropTypes.string,
    uid: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default MemberCard;
