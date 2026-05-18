import axios from 'axios';

async function loginusers (data){
    try {
        const result = await axios.post(
          `http://localhost:5000/api/v1/login`,
          data
        );
        return result.data;
      } catch (error) {
        console.log(error);
        throw error;
      }
}

async function addPatient(data){
    try {
        const result = await axios.post(
            `http://localhost:5000/api/v1/add-patient`,
            data
        );
        return result.data;
    }
    catch (error) {
        console.log(error);
        throw error;
    }
}

async function getPatients(){
    try {
        const result = await axios.get(
            `http://localhost:5000/api/v1/get-patients`
        );
        return result.data;
    }
    catch (error) {
        console.log(error);
        throw error;
    }
}

async function deletePatient(id){
    try {
        const result = await axios.delete(
            `http://localhost:5000/api/v1/delete-patient/${id}`
        );
        return result.data;
    }
    catch (error) {
        console.log(error);
        throw error;
    }
}

async function updatePatient(id, data){
    try {
        const result = await axios.put(
            `http://localhost:5000/api/v1/update-patient/${id}`,
            data
        );
        return result.data;
    }
    catch (error) {
        console.log(error);
        throw error;
    }
}


async function addDoctor(data){
    try {
        const result = await axios.post(
            `http://localhost:5000/api/v1/add-doctor`,
            data
        );
        return result.data;
    }
    catch (error) {
        console.log(error);
        throw error;
    }
}

async function getDoctors(){
    try {
        const result = await axios.get(
            `http://localhost:5000/api/v1/get-doctors`
        );
        return result.data;
    }
    catch (error) {
        console.log(error);
        throw error;
    }
}

async function assignDoctor(patientId, doctorId) {
    try {
        const result = await axios.put(
            `http://localhost:5000/api/v1/assign-doctor/${patientId}`,
            { doctor_id: doctorId }
        );
        return result.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function deleteDoctor(id){
    try {
        const result = await axios.delete(
            `http://localhost:5000/api/v1/delete-doctor/${id}`
        );
        return result.data;
    }
    catch (error) {
        console.log(error);
        throw error;
    }
}
export {loginusers, addPatient, getPatients, deletePatient, updatePatient, assignDoctor, addDoctor, getDoctors, deleteDoctor};