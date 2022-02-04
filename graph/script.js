fetch("./json.json")
    .then(response => response.json())
    .then(jsonData => {
        console.log(jsonData);

        const graph = document.getElementById("graph").getContext("2d");

        let tableauNom = [];

        let tableauAge = [];


        jsonData.forEach(personne => {
            tableauAge.push(personne.age);
            tableauNom.push(personne.name);
        });

        let myChart = new Chart(graph, {
            type: "bar",
            data: {
                labels: tableauNom,
                datasets: [{
                    label: "Production journalière",
                    data: tableauAge,
                    backgroundColor: [
                        "red",
                        "orange",
                        "green"
                    ],

                }, ],
            },
        });
    });