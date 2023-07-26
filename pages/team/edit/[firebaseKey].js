import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleMember } from '../../../api/MemberData';
import MemberForm from '../../MemberForm';

export default function EditMember() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleMember(firebaseKey).then(setEditItem);
  }, [firebaseKey]);

  return (<MemberForm obj={editItem} />);
}
