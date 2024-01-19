import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ButtonDefault from "../component/buttonDefault";
import Swal from 'sweetalert2'
import { v4 as uuidv4 } from "uuid";
import "../style/notes.css";

const AddNotes = () => {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const navigate = useNavigate();

    const saveNotes = async (e) => {
        e.preventDefault();
        const noteId = uuidv4(); // Generate a unique ID using uuidv4
        const notes = {
            id: noteId,
            title,
            body,
            createdAt: new Date(),
            archived: false,
        };
        try {
            const response = await fetch("http://localhost:8989/posts", {
                method: "POST",
                body: JSON.stringify(notes),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok) {
                throw new Error("Failed to save notes");
            }
            Swal.fire({
                title: "Berhasil",
                text: "Catatan-mu sudah tersimpan",
                icon: "success"
            });
        } catch (error) {
            console.error("Error saving notes:", error);
            Swal.fire({
                title: "Gagal",
                text: "Catatan-mu tidak tersimpan",
                icon: "error"
            });
        }
        console.log(notes);
        navigate("/");
    };

    return (
        <div className="container">
            <form onSubmit={saveNotes} className="mt-4">
                <div className="input-group mb-3">
                    <span className="input-group-text labelForm" id="basic-addon1">
                        Title of Note
                    </span>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="form-control"
                        placeholder="Character limit: 100 (including letters, numbers, and symbols)"
                        aria-label="Title"
                        aria-describedby="basic-addon1"
                    />
                </div>
                <div className="input-group">
                    <span className="input-group-text labelForm">Your notes</span>
                    <textarea
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                        className="form-control textArea"
                        aria-label="Notes"
                        defaultValue={""}
                    />
                </div>
                <div className="d-flex flex-row gap-md-2 mb-2">
                    <ButtonDefault
                        name="button"
                        target="/"
                        style="btn btn-danger"
                        styleContainer="text-start mt-4"
                        text="back"
                        icon="fa-solid fa-arrow-left"
                    />
                    <ButtonDefault
                        name="submit"
                        style="btn btn-primary"
                        styleContainer="text-start mt-4"
                        text="Submit"
                    />
                </div>
            </form>
        </div>
    );
};

export default AddNotes;
