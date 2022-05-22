$(document).ready(function()   {
    $('#input').autocomplete({
        source: async function(request, response) {
            let data = await fetch(`http://localhost:2000/search?term= ${request.term}`)
            .then(results => results.json())
            .then(results => results.map(result => {
                return { label : result.name, value: result.name, id: result._id };
            }));
            response(data);
        },
        minLength: 1,
        select: function(event, ui){
            console.log(ui.item);
            fetch(`http://localhost:2000/get/${ui.item.id}`)
            .then(result => result.json())
            .then(result => {
                $("#collegelist").empty();
                result.review.forEach(review => {
                    $("#collegelist").append(`<li>${review}</li>`);
                });
            });
        }
    });
});