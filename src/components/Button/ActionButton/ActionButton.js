import CircularButton from "../CircularButton/CircularButton";
import styles from "./ActionButton.module.css";

const ActionButtons = ({
  currentPageIndex,
  totalPages,
  goToFirstPage,
  goToPreviousPage,
  goToNextPage,
  goToLastPage,
  goToPage,
  getPaginationCluster,
  DeleteAll,
  getSelectedCount,
}) => {
  return (
    <div className={styles.actionButton}>
      <button
        className={styles.actionButton_delete}
        disabled={getSelectedCount()}
        onClick={DeleteAll}
      >
        <span>Delete Selected</span>
      </button>

      <CircularButton
        content={`${String.fromCharCode(60)}${String.fromCharCode(60)}`}
        isDisabled={currentPageIndex === 1 ? true : false}
        isSelected={false}
        onClick={goToFirstPage}
      />
      <CircularButton
        content={String.fromCharCode(60)}
        isDisabled={currentPageIndex === 1 ? true : false}
        isSelected={false}
        onClick={goToPreviousPage}
      />
      {getPaginationCluster().map((item, index) => (
        <CircularButton
          key={index}
          content={item}
          isDisabled={false}
          //   className={styles.PaginationButtons}
          isSelected={currentPageIndex === index + 1 ? true : false}
          onClick={goToPage}
        />
      ))}
      <CircularButton
        content={String.fromCharCode(62)}
        isDisabled={
          currentPageIndex === totalPages || totalPages === 0 ? true : false
        }
        isSelected={false}
        onClick={goToNextPage}
      />
      <CircularButton
        content={`${String.fromCharCode(62)}${String.fromCharCode(62)}`}
        isDisabled={
          currentPageIndex === totalPages || totalPages === 0 ? true : false
        }
        onClick={goToLastPage}
        isSelected={false}
      />
    </div>
  );
};
export default ActionButtons;
