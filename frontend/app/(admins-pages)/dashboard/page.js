import { getDashBordDetails } from '@/services/dashBoardServices';
import React from 'react'
import Dashboard from './DashBoard'

export default async function page() {
  let isloading = false;
  let details = [];

  try {
    isloading = true;
    details = await getDashBordDetails();


  } catch (err) {
    console.log(err, "err in DashBoard Page")
  } finally {
    isloading = false;
  }


  return (
    <Dashboard details={details} />
  )
}
