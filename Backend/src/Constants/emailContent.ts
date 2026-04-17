
export const SetHtmlContent = (content: any) => {
    const htmlContent = `
        <div style="font-family: 'Inter', 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: auto; background-color: #0a0a0a; border: 1px solid #1f2937; border-radius: 16px; overflow: hidden; color: #ffffff;">
            
            <div style="background-color: #10b981; padding: 30px; text-align: center;">
                <div style="display: inline-block; padding: 8px 12px; background-color: #000000; border-radius: 8px; margin-bottom: 10px;">
                    <span style="color: #10b981; font-family: monospace; font-weight: bold; font-size: 20px;">&lt;C&gt;</span>
                </div>
                <h1 style="margin: 0; font-size: 24px; font-weight: 800; letter-spacing: -0.5px; color: #000000;">component.io</h1>
                <p style="margin: 5px 0 0; font-size: 14px; color: #064e3b; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">Security Verification</p>
            </div>

            <div style="padding: 40px 30px; text-align: center;">
                <h2 style="color: #ffffff; margin-bottom: 10px; font-size: 22px;">Verify your email address</h2>
                <p style="color: #9ca3af; line-height: 1.6; font-size: 15px;">
                    Welcome to component.io! To complete your signup and start building stunning UI with AI, please use the verification code below.
                </p>

                <div style="background-color: #111827; border: 1px solid #10b981; padding: 30px; border-radius: 12px; margin: 30px 0; box-shadow: 0 0 20px rgba(16, 185, 129, 0.1);">
                    <p style="margin: 0 0 10px; font-size: 12px; color: #10b981; font-weight: 700; letter-spacing: 2px; text-transform: uppercase;">Your Verification Code</p>
                    <h1 style="margin: 0; font-size: 42px; letter-spacing: 12px; color: #10b981; font-family: monospace;">${content}</h1>
                    <p style="margin: 15px 0 0; font-size: 13px; color: #6b7280;">This code will expire in <b>10 minutes</b>.</p>
                </div>

                <p style="color: #6b7280; font-size: 14px; line-height: 1.6;">
                    If you did not request this email, you can safely ignore it. Your account security is our priority.
                </p>
            </div>

            <div style="background-color: #050505; padding: 20px; text-align: center; font-size: 12px; color: #4b5563; border-top: 1px solid #1f2937;">
                <p style="margin: 0 0 5px;">&copy; 2026 component.io | Built for Developers</p>
                <p style="margin: 0;">Indore, Madhya Pradesh, India</p>
            </div>
        </div>
    `;

    return htmlContent ; 
}

