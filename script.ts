//---------- BOOTSTRAP SVGs: ----------//
let fullSquare: string = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-square-fill" viewBox="0 0 16 16">
  <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2z"/>
</svg>`

//---------- DATA STRUCTURES: ----------//
interface Scooter {
    serialNumber: string;
    model: string;
    batteryLevel: number;
    imageUrl: string; 
    color: string;
    status: Status;
}
enum Status {
    "Available",
    "Undergoing Repair",
    "Unavailable"
};

class ScooterCard {
    element: HTMLElement;
    scooterData: any;
    constructor(element: HTMLElement, scooterData: Scooter) {
        this.element = element;
        this.scooterData = scooterData;
        this.renderCards();
    };
    renderCards(): void {
        this.element.classList.add('card');
        this.element.innerHTML = `
            <h2>${this.scooterData.model} </h2>
            <image href="${this.scooterData.imageUrl}">
            <p> Color: <span color="${this.scooterData.color}">${fullSquare}</span></p>
            <p> Status: ${this.scooterData.status} </p>
            <p> Battery: ${this.scooterData.batteryLevel}% </p>
            <p class="edit-delete-container"><button class="edit-button"> Edit <button>
            <button class="delete-button"> Delete </button></p>
            `;
        this.addEventListeners();
    };
    addEventListeners(): void {
        this.element.querySelector('.delete-button')?.addEventListener("click", () => {
            removeScooter(this.scooterData.id);
        });
        this.element.querySelector('.edit-button')?.addEventListener("click", () => {
            //openEditForm(this.scooterData.id);
        });
    };
};

//---------- API FUNCTIONS: ----------//
const BASE_URL = "https://66eabf1755ad32cda47a3afc.mockapi.io/api/storage/scooters";

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
            throw new Error("Scooter updating failed!");
        }
    } catch (error) {
        throw error;
    } 
};

//---------- MAIN ELEMENTS: ----------//
const CONTAINER = document.getElementById('card-container');

//---------- DOM FUNCTIONS: ----------//
document.addEventListener("DOMContentLoaded", () => {
    renderCards();
});
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById('add-scooters-button')?.addEventListener("click", () => {
        const createForm = document.getElementById('create-form');
        if (createForm) {
            createForm.classList.add('unhidden');
        }
    });

    document.getElementById('create-form')?.addEventListener("submit", async (event) => {
        event.preventDefault();
        // Will add form data collection logic here
    });
});


function renderCards(): void {
    const allScooters = getAllScooters();
}








//---------- TESTING AREA: ----------//

// let xiaomi: Scooter = {model: "xiaomi 340x", batteryLevel: 80, imageUrl: "https://placeholder/example324.jpeg", color: "#000000", status: 0};
// let ninebot: Scooter = {model: "ninebot 4", batteryLevel: 70, imageUrl: "https://placeholder/example333.jpeg", color: "#101010", status: 1};
//addScooter(xiaomi).then(() => console.log("Scooter added successfully")).catch(error => console.error(error));
//addScooter(ninebot).then(() => console.log("Scooter added successfully")).catch(error => console.error(error));
//getScooter("4").then(result => console.log(result)).catch(error => console.error(error));
//getAllScooters().then(result => console.log(result)).catch(error => console.error(error));
//editScooter("3", {model: "NOT xiaomi 340x", batteryLevel: 80, imageUrl: "https://placeholder/example324.jpeg", color: "#000000", status: 0}).then(() => console.log("Scooter edited successfully")).catch(error => console.error(error));
//getAllScooters().then(result => console.log(result)).catch(error => console.error(error));
//removeScooter("4").then(() => console.log("Scooter removed successfully")).catch(error => console.error(error));
//getAllScooters().then(result => console.log("all scooters:\n", result)).catch(error => console.error(error));
