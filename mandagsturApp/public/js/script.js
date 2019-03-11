function convertDate(date) {
    let day = Math.floor(date.substr(8, 2));
    let month = Math.floor(date.substr(5, 2));
    let year = date.substr(0, 4);

    let months = ['januar',
                  'februar',
                  'mars',
                  'april',
                  'mai',
                  'juni',
                  'juli',
                  'august',
                  'september',
                  'oktober',
                  'november',
                  'desember'];

    let newDate = day + '. ' + months[month - 1];

    return newDate;
}
