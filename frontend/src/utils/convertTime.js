const convertTime = (time) => {
    // Split the time into parts
    const timeParts = time.split(":");
    let hours = parseInt(timeParts[0]);
    const minutes = parseInt(timeParts[1]);
    let meridiem = "am";

    // Convert to 12-hour format and determine meridiem
    if (hours >= 12) {
        meridiem = "pm";
        if (hours > 12) {
            hours -= 12;
        }
    } else if (hours === 0) {
        hours = 12; // Handle midnight case
    }

    return (
        hours.toString().padStart(2, "0") +
        ":" +
        minutes.toString().padStart(2, "0") + " " +
        meridiem
    );
};

export default convertTime;