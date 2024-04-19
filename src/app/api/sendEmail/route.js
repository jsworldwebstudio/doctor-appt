import { Resend } from 'resend';
import { NextResponse } from 'next/server';
import EmailTemplate from '../../../../emails';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req){

  const response = await req.json();
  try {

    await resend.emails.send({
      from: 'support@jsworldwebstudio.com',
      to: [response.data.Email, 'james.slaughter08@gmail.com', 'james.slaughter08@icloud.com'],
      subject: 'Appointment Booking Confirmation',
      react: EmailTemplate({response}),
    });

    return NextResponse.json({data})
  } catch (error) {

    return NextResponse.json({error})
    
  }
}
