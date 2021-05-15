import { IColumn } from "@fluentui/react/lib/DetailsList";
import { NavLink } from "react-router-dom";

export const columns = [
  {
    key: "Name",
    name: "Name",
    fieldName: "Name",
    minWidth: 100,
    maxWidth: 200,
    isResizable: true,
  },
  {
    key: "Age",
    name: "Age",
    fieldName: "Age",
    minWidth: 100,
    maxWidth: 200,
    isResizable: true,
  },
  {
    key: "Species",
    name: "Species",
    fieldName: "Species",
    minWidth: 100,
    isResizable: true,
  },
  {
    key: "NavBtn",
    name: "Detail",
    fieldName: "ID",
    minWidth: 100,
  },
];
export const renderColumn = (
  item?: any,
  index?: number | undefined,
  column?: IColumn | undefined
): React.ReactNode => {
  if (column?.key === "Age") {
    return `${item.age} years old`;
  } else if (column?.key === "Name") {
    return `${item.name}`;
  } else if (column?.key === "Species") {
    return `${item.species}`;
  } else if (column?.key === "NavBtn") {
    return (
      <NavLink to={`/pet/${item.id}`} activeClassName="selected">
        Detail
      </NavLink>
    );
  }
};
