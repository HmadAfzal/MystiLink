import { Resend } from "resend";
import "dotenv/config";
export const resend = new Resend(process.env.RESEND_API_KEY);
import verificationEmail from "../../emails/verificationEmail";

import { apiResponse } from "../types/apiResponse";

export const sendVerificationEmail = async (
  username: string,
  email: string,
  verifyCode: string
): Promise<apiResponse> => {
  try {
    await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: email,
      subject: "tru-feedback | verification email",
      react: verificationEmail({ username, otp: verifyCode }),
    });

    console.log({ username, email, verifyCode });
    return {
      success: true,
      message: "verification email sent successfully",
    };
  } catch (error) {
    console.log("error sending verification email", error);

    return {
      success: false,
      message: "failed to send verification email",
    };
  }
};
