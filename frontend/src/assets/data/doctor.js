import doctorImg01 from "../images/doctor-img01.jpg";
import doctorImg02 from "../images/doctor-img02.jpg";
import doctorImg03 from "../images/doctor-img03.jpg";

export const doctor = [{
        id: "01",
        name: "Dr. Suraj Banshal",
        specialization: "Surgeon",
        avgRating: 4.8,
        totalRating: 272,
        photo: doctorImg01,
        totalPatients: 1500,
        hospital: "Hayat Hospital.",
    },
    {
        id: "02",
        name: "Dr. Rohan Sharma",
        specialization: "Neurologist",
        avgRating: 4.8,
        totalRating: 272,
        photo: doctorImg02,
        totalPatients: 1500,
        hospital: "NemCare+ Hospital.",
    },
    {
        id: "03",
        name: "Dr. Prem Dutta",
        specialization: "Dermatologist",
        avgRating: 4.8,
        totalRating: 272,
        photo: doctorImg03,
        totalPatients: 1500,
        hospital: "Apollo clinic.",
    },
];

export default doctor;