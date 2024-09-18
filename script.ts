//---------- DATA STRUCTURES: ----------//

interface Scooter {
    serialNumber?: string;
    model: string;
    batteryLevel: number;
    imageUrl: string; 
    color: string;
    status: Status;
}
enum Status {
    "Available",
    "Repairs",
    "Unavailable"
};

//---------- API FUNCTIONS: ----------//
async function getScooter(id: string): Promise<Scooter> {
    try {
        const response = await fetch(`${BASE_URL}/${id}`);
        if (!response.ok) {
            throw new Error("Scooter fetching failed!");
        }
        let scooter = await response.json();
        return scooter;
    } catch (error) {
        throw error;
    } 
};

async function getAllScooters(): Promise<Array<Scooter>> {
    try {
        const response = await fetch(BASE_URL);
        if (!response.ok) {
            throw new Error("Scooter List fetching failed!");
        }
        let scooters = await response.json();
        return scooters;
    } catch (error) {
        throw error;
    } 
};

const BASE_URL = "https://66ea9b7555ad32cda479a15b.mockapi.io/api";

async function addScooter(newScooter: Scooter): Promise<void> {
    try {
        const response = await fetch(BASE_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newScooter)
        });
        if (!response.ok) {
            throw new Error("Scooter uploading failed!");
        }
        alert("Scooter uploaded successfully!");

    } catch (error) {
        throw error;
    }
};


async function removeScooter(id: string): Promise<void> {
    try {
        const response = await fetch(`${BASE_URL}/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
        });
        if (!response.ok) {
            throw new Error("Scooter fetching failed!");
        }
        let scooter = await response.json();
        return scooter;
    } catch (error) {
        throw error;
    } 
};

async function editScooter(id: string, edittedScooter: Scooter): Promise<void> {
    try {
        const response = await fetch(`${BASE_URL}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(edittedScooter)
        });
        if (!response.ok) {
            throw new Error("Scooter fetching failed!");
        }
    } catch (error) {
        throw error;
    } 
};