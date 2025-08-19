export const apiUrl = "http://localhost:8000/api";

export const adminToken = () => {
    const data = localStorage.getItem("adminInfo");
    if (data) {
        const adminInfo = JSON.parse(data);
        return adminInfo.token;
    }
}

export const userToken = () => {
    const data = localStorage.getItem("userInfo");
    if (data) {
        const userInfo = JSON.parse(data);
        return userInfo.token;
    }
}