const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
});

async function sendMatchVerificationEmail({
    to,
    candidateItem,
    newItem,
    verificationUrl
}) {
    const mailOptions = {
        from: `"FoundIt" <${process.env.EMAIL_USER}>`,
        to,

        subject: "Possible Match Found - FoundIt",

        html: `
            <div style="
                font-family: Arial, sans-serif;
                line-height: 1.6;
                max-width: 600px;
                margin: auto;
            ">

                <h2>🔎 Possible Match Found!</h2>

                <p>
                    We found a possible match for your lost item
                    on <strong>FoundIt</strong>.
                </p>

                <h3>Your Lost Item</h3>

                <p>
                    <strong>Name:</strong> ${newItem.name}
                </p>

                <p>
                    <strong>Category:</strong> ${newItem.category}
                </p>

                <p>
                    <strong>Location:</strong> ${newItem.location}
                </p>

                <p>
                    <strong>Date:</strong>
                    ${new Date(newItem.date).toLocaleDateString("en-IN")}
                </p>

                <hr>

                <h3>🎯 Possible Found Item</h3>

                <p>
                    <strong>Name:</strong> ${candidateItem.name}
                </p>

                <p>
                    <strong>Category:</strong> ${candidateItem.category}
                </p>

                <p>
                    <strong>Location:</strong> ${candidateItem.location}
                </p>

                <p>
                    <strong>Date:</strong>
                    ${new Date(candidateItem.date).toLocaleDateString("en-IN")}
                </p>

                <p>
                    Our matching system identified this item as
                    a possible match for your lost item.
                </p>

                <p>
                    <a
                        href="${candidateItem.image}"
                        target="_blank"
                        style="
                            display:inline-block;
                            padding:12px 20px;
                            background:#333;
                            color:white;
                            text-decoration:none;
                            border-radius:5px;
                        "
                    >
                        🖼️ View Found Item Image
                    </a>
                </p>

                <hr>

                <h3>📞 Contact the Finder</h3>

                <p>
                    You can directly contact the person who reported
                    this item as found.
                </p>

                <p>
                    <strong>Email:</strong>
                    ${candidateItem.email}
                </p>

                <p>
                    <strong>Phone:</strong>
                    ${candidateItem.contact}
                </p>

                <p>
                    <a
                        href="${verificationUrl}"
                        style="
                            display:inline-block;
                            padding:12px 20px;
                            background:#4CAF50;
                            color:white;
                            text-decoration:none;
                            border-radius:5px;
                        "
                    >
                        🔍 View Match
                    </a>
                </p>

                <p>
                    Please verify the item carefully before
                    arranging its return.
                </p>

                <p>
                    — FoundIt
                </p>

            </div>
        `
    };

    return transporter.sendMail(mailOptions);
}

module.exports = {
    sendMatchVerificationEmail
};