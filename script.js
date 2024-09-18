"use strict";
//---------- DATA STRUCTURES: ----------//
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var Status;
(function (Status) {
    Status[Status["Available"] = 0] = "Available";
    Status[Status["Repairs"] = 1] = "Repairs";
    Status[Status["Unavailable"] = 2] = "Unavailable";
})(Status || (Status = {}));
;
//---------- API FUNCTIONS: ----------//
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
const BASE_URL = "https://66ea9b7555ad32cda479a15b.mockapi.io/api";
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
            alert("Scooter uploaded successfully!");
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
            let scooter = yield response.json();
            return scooter;
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
                throw new Error("Scooter fetching failed!");
            }
        }
        catch (error) {
            throw error;
        }
    });
}
;
