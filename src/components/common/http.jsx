export const apiUrl = "http://localhost:8000/api";

export const adminToken = () => {
    const data = localStorage.getItem("adminInfo");
    if (data) {
        const adminInfo = JSON.parse(data);
        return adminInfo.token;
    }
}