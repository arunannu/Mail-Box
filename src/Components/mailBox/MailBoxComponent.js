import React, { useState, useEffect } from "react";
import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
const MailBoxComponent = () => {
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [mailBody, setMailBody] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setMailBody(editorState.getCurrentContent().getPlainText());
  }, [editorState]);
  const senderEmail = localStorage.getItem("email");
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    return `${day}/${month}/${year} - ${hours}:${minutes}:${seconds}`;
  };
  const formattedDate = formatDate(new Date());
  const handleSend = async () => {
    setLoading(true);
    const changedSenderMail = senderEmail.replace(/[@.]/g, "");
    const mailData = {
      to: to,
      subject: subject,
      message: mailBody,
      read: true,
      time: formattedDate,
      send: true,
      receive: false,
    };

    try {
      const response = await fetch(
        `https://mail-box-c3328-default-rtdb.firebaseio.com//${changedSenderMail}SentMail.json`,
        {
          method: "POST",
          body: JSON.stringify(mailData),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      let data = await response;
      console.log(data);
    } catch (err) {
      console.log(err);
    }

    try {
      const mail = to.replace(/[@.]/g, "");
      const response = await fetch(
        `https://mail-box-c3328-default-rtdb.firebaseio.com//${mail}Inbox.json`,
        {
          method: "POST",
          body: JSON.stringify({
            from: senderEmail,
            subject: subject,
            message: mailBody,
            read: false,
            time: formattedDate,
            send: false,
            receive: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      let data = await response;
      console.log(data);
      setLoading(false);
    } catch (err) {
      alert(err);
    }
    setTo("");
    setSubject("");
    setEditorState(EditorState.createEmpty());
  };

  return (
    <div
      className="container border border-dark bg-body-tertiary"
      style={{
        display: "flex",
        width: "850px",
        height: "auto",
        float: "right",
      }}
    >
      <div className="my-3">
        <div className="mb-3">
          <input
            type="email"
            className="form-control"
            placeholder="To"
            value={to}
            onChange={(e) => setTo(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
        </div>
        <Editor
          editorState={editorState}
          onEditorStateChange={setEditorState}
          placeholder="Write your message here..."
        />
        <button className="btn btn-primary mt-3" onClick={handleSend}>
          Send
        </button>
      </div>
    </div>
  );
};

export default MailBoxComponent;
