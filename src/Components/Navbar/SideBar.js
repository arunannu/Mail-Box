import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {  Button } from "react-bootstrap";
import MailBoxComponent from "../mailBox/MailBoxComponent";
import { BiMailSend, BiTrash } from "react-icons/bi";
import { TbMailPlus, TbMailOpenedFilled } from "react-icons/tb";
import { RiMailUnreadFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import {
  CDBSidebar,
  CDBSidebarHeader,
  CDBSidebarContent,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
  CDBBadge,
} from "cdbreact";
const Sidebar = () => {
  const [modalShow, setModalShow] = useState(false);
  const [mailCount, setMailCount] = useState(0);
  const email = localStorage.getItem("email");
  // const inboxMails = localStorage.getItem("numberOfMails");
  const inboxMails = useSelector((state) => state.email.unreadMails);
  const outbox = useSelector((state) => state.email.sent);
  const outboxMails = outbox.length;
  console.log(outboxMails);
  useEffect(() => {
    setMailCount(inboxMails);
  }, [email, inboxMails]);

  return (
    <>
      <MailBoxComponent show={modalShow} onHide={() => setModalShow(false)} />
      <div
        style={{
          display: "flex",
          height: "100vh",
          overflow: "scroll initial",
          float: "left",
        }}
      >
        <CDBSidebar>
          <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large" />}>
            <Button
              variant="outline-primary"
              onClick={() => setModalShow(true)}
            >
              Compose <TbMailPlus />
            </Button>
          </CDBSidebarHeader>
          <CDBSidebarContent>
            <CDBSidebarMenu>
              <CDBSidebarMenuItem
                suffix={
                  <CDBBadge color="success" size="small" borderType="pill">
                    {mailCount}
                  </CDBBadge>
                }
              >
                <Link to="/inbox">
                  <RiMailUnreadFill /> Inbox
                </Link>
              </CDBSidebarMenuItem>
              <CDBSidebarMenuItem suffix={<CDBBadge size="small">4</CDBBadge>}>
                <TbMailOpenedFilled /> All Mails
              </CDBSidebarMenuItem>
              <CDBSidebarMenuItem
                suffix={
                  <CDBBadge color="danger" size="small" borderType="pill">
                    {outboxMails}
                  </CDBBadge>
                }
              >
                <Link to="/outbox">
                  <BiMailSend /> Outbox
                </Link>
              </CDBSidebarMenuItem>
              <CDBSidebarMenuItem>
                <Link to="/inbox/deletedMails/:id">
                  <BiTrash /> Trash
                </Link>
              </CDBSidebarMenuItem>
            </CDBSidebarMenu>
          </CDBSidebarContent>
        </CDBSidebar>
      </div>
    </>
  );
};
export default Sidebar;
