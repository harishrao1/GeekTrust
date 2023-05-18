import { useState } from "react";
import TableHeading from "../TableHeading/TableHeading";
import UserDetails from "../UserDetails/UserDetails";

const Table = ({
  getAllSelected,
  onSelectAll,
  getItemsPerPage,
  onEdit,
  onDelete,
  onEditValues,
  onSelect,
}) => {
  const [editedUserValues, setEditedUserValues] = useState({});
  const handleUserEditing = (event) => {
    setEditedUserValues({
      ...editedUserValues,
      [event.target.name]: event.target.value,
    });
  };
  return (
    <table>
      <TableHeading
        getAllSelected={getAllSelected}
        onSelectAll={onSelectAll}
        getItemsPerPage={getItemsPerPage}
      />
      <tbody>
        {getItemsPerPage().map((items, index) => (
          <UserDetails
            key={index}
            user={items}
            onSelect={onSelect}
            handleEdit={handleUserEditing}
            onEditClick={onEdit.bind(null, items)}
            onDeleteClick={onDelete.bind(null, items.id)}
            onConfirmEdit={onEditValues.bind(null, items, editedUserValues)}
          />
        ))}
      </tbody>
    </table>
  );
};
export default Table;
