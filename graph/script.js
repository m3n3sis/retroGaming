const graph = document.getElementById("graph").getContext("2d");

let myChart = new Chart(graph, {
    type: "bar",
    data: {
        labels: [
            "Alex",
            "Alexis",
            "Paul",



        ],
        datasets: [{
            label: "Age",
            data: [32, 32, 27],
            backgroundColor: [
                "red",
                "orange",
                "green"
            ],

        }, ],
    },
});