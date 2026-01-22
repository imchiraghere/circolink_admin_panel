import React from "react";
import GroupTable from "../../components/dashboard/GroupTable";
import DashboardStats from "../../components/dashboard/DashboardStats";

const page = () => {
  return (
    <>
      <DashboardStats />
      <GroupTable />
    </>
  );
};

export default page;
