import "./UserDetails.css";
import CircularButton from "../../Button/CircularButton/CircularButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
const UserDetails = ({
  onSelect,
  user,
  handleEdit,
  onEditClick,
  onDeleteClick,
  onConfirmEdit,
}) => {
  // console.log(user);
  if (user.visible && !user.deleted) {
    return (
      <tr className={user.checked ? "highlighted" : ""}>
        <td onClick={user.checked ? null : (event) => onSelect(event, user)}>
          <input
            type="checkbox"
            name={user.name}
            style={{ cursor: "pointer" }}
            onChange={(event) => onSelect(event, user)}
            checked={user.checked}
          />
        </td>
        {user.edit && (
          <>
            <td>
              <input
                type="text"
                name="name"
                defaultValue={user.name}
                onChange={handleEdit}
              />
            </td>
            <td>
              <input
                type="email"
                name="email"
                defaultValue={user.email}
                onChange={handleEdit}
              />
            </td>
            <td>
              <input
                type="text"
                name="role"
                defaultValue={user.role}
                onChange={handleEdit}
              />
            </td>
          </>
        )}

        {!user.edit && (
          <>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.role}</td>
          </>
        )}

        {user.edit && (
          <td>
            <CircularButton
              content={String.fromCharCode(10003)}
              isDisabled={false}
              isSelected={false}
              onClick={onConfirmEdit}
            />
          </td>
        )}

        {!user.edit && (
          <td>
            <>
              <FontAwesomeIcon
                icon={faEdit}
                style={{
                  marginRight: "2rem",
                  cursor: "pointer",
                }}
                onClick={onEditClick}
              />
              <FontAwesomeIcon
                icon={faTrash}
                color="red"
                style={{ cursor: "pointer" }}
                onClick={onDeleteClick}
              />
            </>
          </td>
        )}
      </tr>
    );
  } else {
    return false;
  }
};
export default UserDetails;
