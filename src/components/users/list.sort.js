import { faSortDown, faSortUp } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const sortList = (list, sortColumn, sortDirection) => {
  if (sortColumn === "") {
    return list;
  }

  return list.slice().sort((a, b) => {
    const columnA = getColumnValue(a, sortColumn);
    const columnB = getColumnValue(b, sortColumn);

    if (columnA < columnB) {
      return sortDirection === "ASC" ? -1 : 1;
    } else if (columnA > columnB) {
      return sortDirection === "ASC" ? 1 : -1;
    } else {
      return 0;
    }
  });
};

const getColumnValue = (item, column) => {
  const properties = column.split(".");
  let value = item;

  for (let property of properties) {
    value = value[property];
    if (!value) break;
  }

  return value && typeof value === "object" ? value.id : value;
};

export const getSortIcon = (
  column,
  sortColumn,
  sortDirection
) => {
  if (sortColumn === column) {
    return sortDirection === "ASC" ? (
      <FontAwesomeIcon icon={faSortUp} />
    ) : (
      <FontAwesomeIcon icon={faSortDown} />
    );
  }
  return null;
};
