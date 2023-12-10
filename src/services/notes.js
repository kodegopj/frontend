import axios from "axios";

const baseUrl = "http://localhost:4001/notes";

async function getNotes() {
    const response = await axios.get(baseUrl);
    return response.data;
};

async function addNote(noteObject) {
    const response = await axios.post(baseUrl, noteObject);
    return response.data;
};

async function deleteNote(id) {
    const res = await axios.delete(`${baseUrl}/${id}`);
    
    return res;
};

async function updateNote(id, updatedNote) {
    const res = await axios.put(`${baseUrl}/${id}`, updatedNote);
    return res.data;
}

export default {
    getNotes,
    addNote,
    deleteNote,
    updateNote,
};