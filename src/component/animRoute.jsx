import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AddNotes from '../page/addNotes';
import AllNotes from '../page/notes';
import UpdateNotes from '../page/updateNotes';
import Archieve from '../page/archieve';

const animRoute = () => {
    return (
        <Routes>
            <Route path="/" element={<AllNotes />} />
            <Route path="/add" element={<AddNotes />} />
            <Route path="/update/:id" element={<UpdateNotes />} />
            <Route path="/archieve" element={<Archieve />} />
        </Routes>
    )
}

export default animRoute;
