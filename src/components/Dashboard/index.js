import { useState, useEffect } from "react";
import { Search, Table } from "../ActionItems";
import ActionButtons from "../Button/ActionButton/ActionButton";
import styles from "./Dashboard.module.css";

const Dashboard = ({
  userData,
  onDelete,
  onSelect,
  onSelectAll,
  onEdit,
  onEditValues,
  rowLimit,
  onSearch,
  deleteAll,
}) => {
  const [totalPages, setTotalPages] = useState(1);
  const [pageLimit, setPageLimit] = useState(1);
  const [currentPageIndex, setCurrentPageIndex] = useState(1);

  const row_Limit = 10;
  //   const Page_Limit = 5;
  useEffect(() => {
    let visibleUserDetails = userData.filter(
      (user) => user.visible && !user.deleted
    );
    let totalVisibleUsers = visibleUserDetails.length;
    let calculatedPages = Math.ceil(totalVisibleUsers / row_Limit);
    setTotalPages(calculatedPages);
    setPageLimit(calculatedPages);
  }, [row_Limit, userData]);

  const goToFirstPage = () => {
    setCurrentPageIndex(1);
  };

  const goToLastPage = () => {
    setCurrentPageIndex(totalPages);
  };

  const goToNextPage = () => {
    setCurrentPageIndex((current) => current + 1);
  };

  const goToPreviousPage = () => {
    setCurrentPageIndex((current) => current - 1);
  };

  const goToPage = (event) => {
    event.preventDefault();
    setCurrentPageIndex(Number(event.target.innerText));
  };

  const getItemsPerPage = () => {
    console.log(userData);
    let visibleUsers = userData.filter((user) => user.visible && !user.deleted);
    const startIndex = currentPageIndex * row_Limit - row_Limit;
    return visibleUsers.slice(startIndex, startIndex + row_Limit);
  };

  const getAllSelected = () => {
    const usersPerPage = getItemsPerPage();
    let flag = usersPerPage.every((user) => user.checked);
    return flag;
  };

  const getSelectedCount = () => {
    const usersPerPage = getItemsPerPage();
    let flag = usersPerPage.every((user) => !user.checked);
    return flag;
  };

  const getPaginationCluster = () => {
    let startingPageIndex =
      Math.floor((currentPageIndex - 1) / pageLimit) * pageLimit;
    const paginationCluster = [];

    for (let idx = 0; idx < pageLimit; idx++) {
      let pageIndex = idx + startingPageIndex + 1;
      paginationCluster.push(pageIndex);
    }

    if (paginationCluster[0] > totalPages) {
      if (startingPageIndex <= 0) {
        return paginationCluster;
      }
      setCurrentPageIndex(startingPageIndex);
    }

    return paginationCluster;
  };

  return (
    <div className={styles.dashboardContainer}>
      <Search placeholder="Search by name, email or role" onChange={onSearch} />
      <Table
        getAllSelected={getAllSelected}
        onSelectAll={onSelectAll}
        getItemsPerPage={getItemsPerPage}
        onEdit={onEdit}
        onDelete={onDelete}
        onEditValues={onEditValues}
        onSelect={onSelect}
      />

      <ActionButtons
        currentPageIndex={currentPageIndex}
        totalPages={totalPages}
        goToFirstPage={goToFirstPage}
        goToPreviousPage={goToPreviousPage}
        goToNextPage={goToNextPage}
        goToLastPage={goToLastPage}
        goToPage={goToPage}
        getPaginationCluster={getPaginationCluster}
        DeleteAll={deleteAll.bind(null, getItemsPerPage())}
        getSelectedCount={getSelectedCount}
      />
    </div>
  );
};

export default Dashboard;
