const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

async function sendMatchVerificationEmail({
    to,
    candidateItem,
    newItem,
    verificationUrl
}) {
    const mailOptions = {
        from: "FoundIt <onboarding@resend.dev>",
        to: [to],

        subject: "Possible Match Found - FoundIt",

        html: `
            <div style="font-family: Arial, sans-serif; line-height: 1.6;">

                <h2>🔎 Possible Match Found</h2>

                <p>
                    A newly reported item may match an item you reported
                    on FoundIt.
                </p>

                <h3>Your item</h3>

                <p>
                    <strong>Name:</strong>
                    ${candidateItem.name}
                </p>

                <p>
                    <strong>Status:</strong>
                    ${candidateItem.status}
                </p>

                <hr>

                <h3>Possible matching item</h3>

                <p>
                    <strong>Name:</strong>
                    ${newItem.name}
                </p>

                <p>
                    <strong>Status:</strong>
                    ${newItem.status}
                </p>

                <p>
                    Our matching system identified this as a
                    possible match.
                </p>

                <p>
                    <a
                        href="${verificationUrl}"
                        style="
                            display:inline-block;
                            padding:12px 20px;
                            background:#28a745;
                            color:white;
                            text-decoration:none;
                            border-radius:5px;
                            margin-right:10px;
                        "
                    >
                        YES, THIS IS MY ITEM
                    </a>

                    <a
                        href="${verificationUrl}/no"
                        style="
                            display:inline-block;
                            padding:12px 20px;
                            background:#dc3545;
                            color:white;
                            text-decoration:none;
                            border-radius:5px;
                        "
                    >
                        NO, NOT MY ITEM
                    </a>
                </p>

                <p>
                    If you did not submit this item, you can safely
                    ignore this email.
                </p>

                <p>
                    — FoundIt
                </p>

            </div>
        `
    };

    const { data, error } = await resend.emails.send(mailOptions);

    if (error) {
        console.error("❌ Resend email error:", error);
        throw new Error(error.message);
    }

    console.log("📧 Email sent successfully through Resend:", data);

    return data;
}

module.exports = {
    sendMatchVerificationEmail
};