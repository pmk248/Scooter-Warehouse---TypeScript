"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
//---------- BOOTSTRAP SVGs: ----------//
let fullSquare = (color) => `
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="${color}" class="bi bi-square-fill" viewBox="0 0 16 16">
    <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2z"/>
</svg>`;
var Status;
(function (Status) {
    Status[Status["Available"] = 0] = "Available";
    Status[Status["Undergoing Repair"] = 1] = "Undergoing Repair";
    Status[Status["Unavailable"] = 2] = "Unavailable";
})(Status || (Status = {}));
;
class ScooterCard {
    constructor(element, scooterData) {
        this.element = element;
        this.scooterData = scooterData;
        this.renderCards();
    }
    ;
    renderCards() {
        this.element.classList.add('card');
        this.element.innerHTML = `
            <input type="hidden" name="serialNumber" value="${this.scooterData.serialNumber}">
            <h2>${this.scooterData.model} </h2>
            <img src="${this.scooterData.imageUrl}" alt="${this.scooterData.model}">
            <p> Color: ${fullSquare(this.scooterData.color)}</p>
            <p> Status: ${Status[this.scooterData.status]} </p>
            <p> Battery: ${this.scooterData.batteryLevel}% </p>
            <p class="edit-delete-container"><button class="edit-button"> Edit </button>
            <button class="delete-button"> Delete </button></p>
            `;
        //EVENT LISTENERS FOR CARD BUTTONS:
        this.addEventListeners();
    }
    addEventListeners() {
        const deleteButton = this.element.querySelector('.delete-button');
        const editButton = this.element.querySelector('.edit-button');
        // DELETE CARD EVENT LISTENER:
        deleteButton === null || deleteButton === void 0 ? void 0 : deleteButton.addEventListener('click', () => {
            if (this.scooterData.serialNumber) {
                removeScooter(this.scooterData.serialNumber);
            }
        });
        // EDIT CARD EVENT LISTENER:
        editButton === null || editButton === void 0 ? void 0 : editButton.addEventListener('click', () => {
            if (this.scooterData.serialNumber) {
                populateEditForm(this.scooterData);
            }
        });
    }
}
//---------- API FUNCTIONS: ----------//
const BASE_URL = "https://66eabf1755ad32cda47a3afc.mockapi.io/api/storage/scooters";
function getScooter(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(`${BASE_URL}/${id}`);
            if (!response.ok) {
                throw new Error("Scooter fetching failed!");
            }
            let scooter = yield response.json();
            return scooter;
        }
        catch (error) {
            throw error;
        }
    });
}
;
function getAllScooters() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(BASE_URL);
            if (!response.ok) {
                throw new Error("Scooter List fetching failed!");
            }
            let scooters = yield response.json();
            return scooters;
        }
        catch (error) {
            throw error;
        }
    });
}
;
function addScooter(newScooter) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(BASE_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newScooter)
            });
            if (!response.ok) {
                throw new Error("Scooter uploading failed!");
            }
        }
        catch (error) {
            throw error;
        }
    });
}
;
function removeScooter(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(`${BASE_URL}/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
            });
            if (!response.ok) {
                throw new Error("Scooter fetching failed!");
            }
        }
        catch (error) {
            throw error;
        }
        renderCards();
    });
}
;
function editScooter(id, edittedScooter) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(`${BASE_URL}/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(edittedScooter)
            });
            if (!response.ok) {
                throw new Error("Scooter updating failed!");
            }
        }
        catch (error) {
            throw error;
        }
    });
}
;
//---------- ELEMENTS: ----------//
const createForm = document.getElementById('create-form');
const editForm = document.getElementById('edit-form');
const unhideCreateButton = document.getElementById('add-scooters-button');
const cancelCreateButton = document.getElementById('cancel-create-form');
const cancelEditButton = document.getElementById('cancel-edit-form');
const cardsContainer = document.getElementById('card-container');
//---------- DOM FUNCTIONS (STATIC FUNCTIONS): ----------//
function renderCards() {
    return __awaiter(this, void 0, void 0, function* () {
        cardsContainer.innerHTML = '';
        const availabilityFilter = document.getElementById('availability-filter').value;
        const batteryFilter = Number(document.getElementById('battery-filter').value);
        // Checks if filter options have been set:
        try {
            let scooters = yield getAllScooters();
            // Filter out unavailable scooters
            if (availabilityFilter === 'available') {
                scooters = scooters.filter(scooter => scooter.status === Status.Available);
            }
            // Filter out below X% battery
            if (batteryFilter > 0) {
                scooters = scooters.filter(scooter => scooter.batteryLevel >= batteryFilter);
            }
            scooters.forEach(scooter => {
                const cardElement = document.createElement('div');
                new ScooterCard(cardElement, scooter);
                cardsContainer.appendChild(cardElement);
            });
        }
        catch (error) {
            console.error('Error fetching and rendering scooters:', error);
        }
    });
}
function populateEditForm(scooter) {
    const editForm = document.getElementById('edit-form');
    editForm.querySelector('input[name="serial-number"]').setAttribute('value', scooter.serialNumber);
    editForm.querySelector('input[name="model"]').setAttribute('value', scooter.model);
    editForm.querySelector('input[name="battery-level"]').setAttribute('value', scooter.batteryLevel.toString());
    editForm.querySelector('input[name="color"]').setAttribute('value', scooter.color);
    editForm.querySelector('input[name="image-url"]').setAttribute('value', scooter.imageUrl);
    editForm.querySelector('select[name="status"]').value = scooter.status.toString();
    openPopup(editForm);
}
function openPopup(popUp) {
    popUp.classList.add('unhidden');
    cardsContainer.classList.add('hidden');
}
;
function closePopup(popUp) {
    popUp.reset();
    popUp.classList.remove('unhidden');
    cardsContainer.classList.remove('hidden');
}
;
//---------- DOM FUNCTIONS (EVENT LISTENERS): ----------//
document.addEventListener("DOMContentLoaded", () => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    renderCards();
    //----- EVENT LISTENERS: -----//
    unhideCreateButton.addEventListener("click", () => {
        openPopup(createForm);
    });
    // CREATE FORM LISTENER
    createForm.addEventListener("submit", (event) => __awaiter(void 0, void 0, void 0, function* () {
        event.preventDefault();
        if (!createForm.checkValidity()) {
            alert('Please enter valid details!');
            return;
        }
        else {
            const formData = new FormData(createForm);
            const newScooter = {
                model: formData.get('model'),
                batteryLevel: Number(formData.get('battery-level')),
                color: formData.get('color'),
                imageUrl: formData.get('image-url'),
                status: Number(formData.get('status')),
            };
            yield addScooter(newScooter);
            yield renderCards();
            closePopup(createForm);
        }
    }));
    // EDIT FORM LISTENER:
    editForm.addEventListener("submit", (event) => __awaiter(void 0, void 0, void 0, function* () {
        event.preventDefault();
        if (!editForm.checkValidity()) {
            alert('Please enter valid details!');
            return;
        }
        else {
            const formData = new FormData(editForm);
            const edittedScooter = {
                serialNumber: formData.get('serial-number'),
                model: formData.get('model'),
                batteryLevel: Number(formData.get('battery-level')),
                color: formData.get('color'),
                imageUrl: formData.get('image-url'),
                status: Number(formData.get('status')),
            };
            if (edittedScooter.serialNumber) {
                yield editScooter(edittedScooter.serialNumber, edittedScooter);
            }
            else {
                console.error("Serial Number is not defined!");
            }
            yield renderCards();
            closePopup(editForm);
        }
    }));
    // CREATE/EDIT FORMS -> CANCEL LISTENERS:
    cancelCreateButton.addEventListener("click", () => {
        closePopup(createForm);
        renderCards();
    });
    cancelEditButton.addEventListener("click", () => {
        closePopup(editForm);
        renderCards();
    });
    (_a = document.getElementById('apply-filters-button')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => {
        renderCards();
    });
}));
