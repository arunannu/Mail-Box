import React from "react";

import MailBoxComponent from "../mailBox/MailBoxComponent";

import {
  CDBSidebar,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from "cdbreact";

const SideBar = () => {
  const [modalShow, setModalShow] = React.useState(false);
  return (
    <>
      <MailBoxComponent show={modalShow} onHide={() => setModalShow(false)} />
      <div
        style={{
          display: "flex",
          height: "69vh",
          overflow: "scroll initial",
          float: "left",
        }}
      >
        <CDBSidebar textColor="#fff" backgroundColor="#333">
          <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
            <button
              className=" btn btn-outline-success"
              onClick={() => setModalShow(true)}
            >
              Compose
            </button>
          </CDBSidebarHeader>

          <CDBSidebarMenu>
            <CDBSidebarMenuItem>MailBox</CDBSidebarMenuItem>
          </CDBSidebarMenu>

          <CDBSidebarFooter></CDBSidebarFooter>
        </CDBSidebar>
      </div>
    </>
  );
};

export default SideBar;
