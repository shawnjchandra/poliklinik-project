export const formatDate = (date) => {
    const date_object = new Date(date);

    const year = date_object.getFullYear();
    const month = String(date_object.getMonth()+1).padStart(2,"0");
    const day = String(date_object.getDate()).padStart(2,"0");

    const formattedDate = `${year}-${month}-${day}`;
    
    return formattedDate;
};