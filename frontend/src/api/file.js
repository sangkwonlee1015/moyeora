import { instance } from "./index";

function registerFile(file, success, error) {
  let formData = new FormData();
  formData.append("file", file);
  instance
    .post(`/file`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then(success)
    .catch(error);
}

function getFiles(success, error) {
  instance.get(`/file`, {}).then(success).catch(error);
}

function getFile(id, success, error) {
  instance.get(`/file/${id}`, {}).then(success).catch(error);
}

function deleteFile(id, success, error) {
  instance.delete(`file/${id}`, {}).then(success).catch(error);
}

export { registerFile, getFile, deleteFile, getFiles };
