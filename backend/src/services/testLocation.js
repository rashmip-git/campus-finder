const {
    calculateLocationScore
} = require("./scoringService");

const tests = [
    ["Cs001", "Cs dept"],
    ["Cs001", "Ps block"],
    ["Cs dept", "Ps block"],
    ["Cs dept", "Cs dept"],
    ["Ps parking", "Ps parking"],
    ["CS department", "CS dept"]
];

console.log("\n=== LOCATION SIMILARITY TEST ===\n");

for (const [locationA, locationB] of tests) {

    const itemA = {
        location: locationA
    };

    const itemB = {
        location: locationB
    };

    const score =
        calculateLocationScore(itemA, itemB);

    console.log(
        `${locationA} ↔ ${locationB}: ${score}`
    );
}