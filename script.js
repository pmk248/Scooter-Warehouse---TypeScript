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
let fullSquare = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-square-fill" viewBox="0 0 16 16">
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
            <h2>${this.scooterData.model} </h2>
            <image href="${this.scooterData.imageUrl}">
            <p> Color: <span color="${this.scooterData.color}">${fullSquare}</span></p>
            <p> Status: ${this.scooterData.status} </p>
            <p> Battery: ${this.scooterData.batteryLevel}% </p>
            <p class="edit-delete-container"><button class="edit-button"> Edit <button>
            <button class="delete-button"> Delete </button></p>
            `;
        this.addEventListeners();
    }
    ;
    addEventListeners() {
        var _a, _b;
        (_a = this.element.querySelector('.delete-button')) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
            removeScooter(this.scooterData.id);
        });
        (_b = this.element.querySelector('.edit-button')) === null || _b === void 0 ? void 0 : _b.addEventListener("click", () => {
            //openEditForm(this.scooterData.id);
        });
    }
    ;
}
;
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
//---------- MAIN ELEMENTS: ----------//
const CONTAINER = document.getElementById('card-container');
//---------- DOM FUNCTIONS: ----------//
document.addEventListener("DOMContentLoaded", () => {
    renderCards();
});
document.addEventListener("DOMContentLoaded", () => {
    var _a, _b;
    (_a = document.getElementById('add-scooters-button')) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
        const createForm = document.getElementById('create-form');
        if (createForm) {
            createForm.classList.add('unhidden');
        }
    });
    (_b = document.getElementById('create-form')) === null || _b === void 0 ? void 0 : _b.addEventListener("submit", (event) => __awaiter(void 0, void 0, void 0, function* () {
        event.preventDefault();
        // Will add form data collection logic here
    }));
});
function renderCards() {
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
