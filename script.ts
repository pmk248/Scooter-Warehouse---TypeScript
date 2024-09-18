//---------- BOOTSTRAP SVGs: ----------//
let fullSquare = (color: string): string => `
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="${color}" class="bi bi-square-fill" viewBox="0 0 16 16">
    <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2z"/>
</svg>`;


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
            <input type="hidden" name="serialNumber" value="${this.scooterData.serialNumber}">
            <h2>${this.scooterData.model} </h2>
            <img src="${this.scooterData.imageUrl}" alt="${this.scooterData.model}">
            <p> Color: ${fullSquare(this.scooterData.color)}</p>
            <p> Status: ${this.scooterData.status} </p>
            <p> Battery: ${this.scooterData.batteryLevel}% </p>
            <p class="edit-delete-container"><button class="edit-button"> Edit </button>
            <button class="delete-button"> Delete </button></p>
            `;

//---------- EVENT LISTENERS FOR BUTTONS: ----------//
        this.addEventListeners();
    }

    addEventListeners(): void {
        const deleteButton = this.element.querySelector('.delete-button');
        const editButton = this.element.querySelector('.edit-button');

        deleteButton?.addEventListener('click', () => {
            if (this.scooterData.serialNumber) {
                removeScooter(this.scooterData.serialNumber);
            }
        });

        editButton?.addEventListener('click', () => {
            if (this.scooterData.serialNumber) {
                populateEditForm(this.scooterData);
            }
        });
    }
}

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
    renderCards();
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

//---------- DOM FUNCTIONS (STATIC FUNCTIONS): ----------//
async function renderCards(): Promise<void> {
    const cardContainer = document.getElementById('card-container') as HTMLElement;
    const createForm = document.getElementById('create-form') as HTMLFormElement;
    const editForm = document.getElementById('edit-form') as HTMLFormElement;

    // Hide if forms are up:
    if (createForm.classList.contains('unhidden') || editForm.classList.contains('unhidden')) {
        cardContainer.style.display = 'none'; 
    } else {
        cardContainer.style.display = 'flex'; 
    }

    cardContainer.innerHTML = '';

    try {
        const scooters = await getAllScooters();
        scooters.forEach(scooter => {
            const cardElement = document.createElement('div');
            new ScooterCard(cardElement, scooter);
            cardContainer.appendChild(cardElement);
        });
    } catch (error) {
        console.error('Error fetching and rendering scooters:', error);
    }
}


function populateEditForm(scooter: Scooter): void {
    const editForm = document.getElementById('edit-form') as HTMLFormElement;
    editForm.querySelector('input[name="serial-number"]')!.setAttribute('value', scooter.serialNumber as string | "");
    editForm.querySelector('input[name="model"]')!.setAttribute('value', scooter.model);
    editForm.querySelector('input[name="battery-level"]')!.setAttribute('value', scooter.batteryLevel.toString());
    editForm.querySelector('input[name="color"]')!.setAttribute('value', scooter.color);
    editForm.querySelector('input[name="image-url"]')!.setAttribute('value', scooter.imageUrl);
    (editForm.querySelector('select[name="status"]') as HTMLSelectElement).value = scooter.status.toString();
    editForm.classList.add('unhidden');
}

//---------- DOM FUNCTIONS (EVENT LISTENERS): ----------//
document.addEventListener("DOMContentLoaded", async () => {
    renderCards();
    //----- ELEMENTS: -----//
    const createForm = document.getElementById('create-form') as HTMLFormElement;
    const editForm = document.getElementById('edit-form') as HTMLFormElement;
    const unhideCreateButton = document.getElementById('add-scooters-button') as HTMLElement;
    const cancelCreateButton = document.getElementById('cancel-create-form') as HTMLElement;

    //----- EVENT LISTENERS: -----//
    unhideCreateButton.addEventListener("click", () => {
        createForm.classList.add('unhidden');
    });
    // CREATE FORM LISTENER
    createForm.addEventListener("submit", async (event: Event) => {
        event.preventDefault();
    if (!createForm.checkValidity()) {
        alert('Please enter valid details!');
        return; 
        } else {
            const formData = new FormData(createForm);
            const newScooter: Scooter = {
                model: formData.get('model') as string,
                batteryLevel: Number(formData.get('battery-level')),
                color: formData.get('color') as string,
                imageUrl: formData.get('image-url') as string,
                status: Number(formData.get('status')),
            };
            createForm.reset();
            await addScooter(newScooter);
            createForm.classList.remove('unhidden');
            await renderCards();
        }
    });
    // EDIT FORM LISTENER:
    editForm.addEventListener("submit", async (event: Event) => {
        event.preventDefault();
        if (!editForm.checkValidity()) {
            alert('Please enter valid details!');
            return; 
        } else {
            const formData = new FormData(editForm);
            const edittedScooter: Scooter = {
                serialNumber: formData.get('serial-number') as string,
                model: formData.get('model') as string,
                batteryLevel: Number(formData.get('battery-level')),
                color: formData.get('color') as string,
                imageUrl: formData.get('image-url') as string,
                status: Number(formData.get('status')),
            };
            if (edittedScooter.serialNumber) {
                await editScooter(edittedScooter.serialNumber , edittedScooter);
            }
            else {
                console.error("Serial Number is not defined!");
            }
            editForm.reset();
            editForm.classList.remove('unhidden');
            await renderCards();
        }
    });
    // Close form:
    cancelCreateButton.addEventListener("click", () => {
        createForm.reset();
        createForm.classList.remove('unhidden');
        renderCards();
    });
});









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
