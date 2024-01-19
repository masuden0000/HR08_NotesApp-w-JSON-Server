import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ButtonDefault from "../component/buttonDefault";
import Swal from 'sweetalert2'
import "../style/notes.css";

const UpdateNotes = () => {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const { id } = useParams();
    const navigate = useNavigate();

    const getNotes = async () => {
        try {
            const response = await fetch(`http://localhost:8989/posts/${id}`, {
                method: "GET",
            });
            const data = await response.json();
            setTitle(data.title);
            setBody(data.body);
        } catch (error) {
            console.error("Error get data:", error);
        }
    };

    const updateNotes = async (e) => {
        e.preventDefault();
        const notes = { title, body, createdAt: new Date() };
        try {
            const response = await fetch(`http://localhost:8989/posts/${id}`, {
                method: "PUT",
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
                text: "Catatan-mu berhasil diperbarui",
                icon: "success"
            });
        } catch (error) {
            console.error("Error saving notes:", error);
            Swal.fire({
                title: "Gagal",
                text: "Catatan-mu tidak tersimpan",
                icon: "success"
            });
        }
        console.log(notes);
        navigate("/");
    };

    useEffect(() => {
        getNotes();
        console.log("Successfully get data");
    }, []);

    return (
        <div className="container">
            <form onSubmit={updateNotes} className="mt-4">
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
                        text="Back"
                        icon="fa-solid fa-arrow-left"
                    />
                    <ButtonDefault
                        functionButton={updateNotes}
                        name="submit"
                        style="btn btn-primary"
                        styleContainer="text-start mt-4"
                        text="Update"
                    />
                </div>
            </form>
        </div>
    );
};

export default UpdateNotes;
