import { format, parseISO } from "date-fns";
import { id } from "date-fns/locale";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import ButtonDefault from "../component/buttonDefault";
import "../style/notes.css";

const Archieve = () => {
    const [notes, setNotes] = useState([]);

    const fetchData = async () => {
        try {
            const response = await fetch(
                "http://localhost:8989/posts?archived=true",
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            const data = await response.json();
            setNotes(data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const showFormattedDate = (date) => {
        const formattedDate = format(parseISO(date), "EEEE, d MMMM yyyy HH:mm:ss", {
            locale: id,
        });
        return formattedDate;
    };

    const deleteNotes = async (id) => {
        const shouldDelete = await Swal.fire({
            title: "Are you sure you want to delete?",
            text: "This action will delete your notes",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#0b5ed7",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        });

        if (shouldDelete.isConfirmed) {
            try {
                await fetch(`http://localhost:8989/posts/${id}`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                fetchData();
                Swal.fire("Catatan Terhapus!", "Catatan berhasil dihapus.", "success");
            } catch (error) {
                console.error("Error delete data:", error);
                Swal.fire(
                    "Gagal!",
                    "Terjadi kesalahan saat menghapus catatan.",
                    "error"
                );
            }
        }
    };

    const updateNotes = async (e, noteId) => {
        e.preventDefault();
        try {
            const existingNote = notes.find((note) => note.id === noteId);
            const updatedNote = { ...existingNote, archived: false };

            const response = await fetch(`http://localhost:8989/posts/${noteId}`, {
                method: "PUT",
                body: JSON.stringify(updatedNote),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error("Failed to save notes");
            }

            fetchData(); // Perbarui data setelah berhasil menyimpan
            Swal.fire({
                title: "Berhasil",
                text: "Catatan-mu berhasil dipindahkan",
                icon: "success",
            });
        } catch (error) {
            console.error("Error saving notes:", error);
            Swal.fire({
                title: "Gagal",
                text: "Catatan-mu tidak berhasil dipindahkan",
                icon: "error",
            });
        }
    };

    useEffect(() => {
        fetchData();
        console.log("Successfully fetched");
    }, []);

    return (
        <div className="container mt-4 p-0">
            <ButtonDefault
                name="button"
                style="btn btn-primary"
                icon="fa-solid fa-plus"
                text="Add Notes"
                target="/add"
                styleContainer="text-start mb-4"
            />
            {notes.length === 0 ? (
                <div className="emptyNote">
                    <h3>Empty Archieve</h3>
                    <p>You not have anything about note to archieve &#128513;</p>
                </div>
            ) : (
                <div className="row row-cols-1 row-cols-md-3 g-4">
                    {notes.map((note) => (
                        <div className="col" key={note.id}>
                            <div className="card rounded-4 notes">
                                <div className="card-body text-start d-flex flex-column justify-content-between">
                                    <div className="headerCard mb-4">
                                        <h2 className="card-title">{note.title}</h2>
                                        <p>Dibuat pada {showFormattedDate(note.createdAt)}</p>
                                    </div>
                                    <div className="text-start h-100 mb-4">
                                        <p className="card-text">{note.body}</p>
                                    </div>
                                    <div className="d-flex flex-row gap-md-2 mb-2 w-100">
                                        <ButtonDefault
                                            name="button"
                                            target={`/update/${note.id}`}
                                            style="btn btn-primary"
                                            icon="fa-solid fa-pen"
                                            text="Update"
                                        />
                                        <ButtonDefault
                                            functionButton={(e) => updateNotes(e, note.id)}
                                            name="submit"
                                            style="btn btn-dark"
                                            icon="fa-solid fa-angle-right"
                                            text="Move"
                                        />
                                        <button
                                            onClick={() => deleteNotes(note.id)}
                                            type="button"
                                            className="btn btn-danger"
                                        >
                                            <i className="fa-solid fa-trash me-2"></i>
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Archieve;
