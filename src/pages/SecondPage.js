import { Card, CardHeader, CardBody, CardTitle, CardText } from "reactstrap";
import RoleCards from "../@core/components/roles-permissions/roles/RoleCards";
import { Fragment } from "react";
import UsersList from "../@core/components/user/list";

const SecondPage = () => {
  return (
    <Fragment>
      <h2>لیست کاربران</h2>
      {/* <RoleCards /> */}
      <UsersList />

      {/* <TableStriped /> */}
    </Fragment>
  );
};

export default SecondPage;
