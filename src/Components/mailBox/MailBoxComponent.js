import React, { useState, useEffect } from "react";
import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const MailBoxComponent = () => {
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [mailBody, setMailBody] = useState("");
  console.log(mailBody);

  useEffect(() => {
    setMailBody(editorState.getCurrentContent().getPlainText());
  }, [editorState]);

  const senderEmail = localStorage.getItem("email");

  const handleSend = async () => {
    const mailData = {
      email: to,
      subject: subject,
      message: mailBody,
    };

    try {
      const response = await fetch(
        `https://mail-box-c3328-default-rtdb.firebaseio.com//${senderEmail}SentMail.json`,
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
    setTo("");
    setSubject("");
    setMailBody("");
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