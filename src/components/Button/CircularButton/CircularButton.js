import styles from "./CircularButton.module.css";
const CircularButton = ({ content, isDisabled, isSelected, onClick }) => {
  return (
    <>
      <button
        className={`${styles.actionButton} ${
          isSelected ? styles.selected : ""
        }`}
        disabled={isDisabled}
        onClick={onClick}
      >
        <span>{content}</span>
      </button>
    </>
  );
};
export default CircularButton;
