const Match = require("../../models/Match");

module.exports = async (req, res, next) => {
    try {
        const { matchId } = req.params;

        const match = await Match.findById(matchId)
            .populate("newItem")
            .populate("candidateItem");

        if (!match) {
            return res.status(404).send("Match not found.");
        }

        let lostItem;
        let foundItem;

        if (match.newItem.status === "Lost") {
            lostItem = match.newItem;
            foundItem = match.candidateItem;
        } else {
            lostItem = match.candidateItem;
            foundItem = match.newItem;
        }

        return res.send(`
            <html>
                <head>
                    <title>FoundIt - Possible Match</title>
                </head>

                <body style="
                    font-family: Arial, sans-serif;
                    max-width: 700px;
                    margin: 40px auto;
                    padding: 20px;
                ">

                    <h1>🔎 Possible Match</h1>

                    <h2>Your Lost Item</h2>

                    <p>
                        <strong>Name:</strong>
                        ${lostItem.name}
                    </p>

                    <p>
                        <strong>Category:</strong>
                        ${lostItem.category}
                    </p>

                    <hr>

                    <h2>🎯 Found Item</h2>

                    <p>
                        <strong>Name:</strong>
                        ${foundItem.name}
                    </p>

                    <p>
                        <strong>Category:</strong>
                        ${foundItem.category}
                    </p>

                    <p>
                        <strong>Location:</strong>
                        ${foundItem.location}
                    </p>

                    <p>
                        <strong>Date:</strong>
                        ${new Date(foundItem.date).toLocaleDateString("en-IN")}
                    </p>

                    ${
                        foundItem.image
                            ? `<img
                                src="${foundItem.image}"
                                alt="${foundItem.name}"
                                style="
                                    max-width:400px;
                                    max-height:400px;
                                    object-fit:contain;
                                "
                              />`
                            : ""
                    }

                    <hr>

                    <h2>📞 Contact the Finder</h2>

                    <p>
                        <strong>Email:</strong>
                        ${foundItem.email}
                    </p>

                    <p>
                        <strong>Phone:</strong>
                        ${foundItem.contact}
                    </p>

                    <p>
                        If this appears to be your lost item,
                        contact the finder using the details above.
                    </p>

                </body>
            </html>
        `);

    } catch (error) {
        console.error("Match view error:", error);
        next(error);
    }
};